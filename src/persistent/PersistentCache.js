class PersistentCache {
  constructor(options = {}) {
    this.storageType = options.storageType || 'localStorage';
    this.namespace = options.namespace || 'cachex';
    this.compression = options.compression || false;
    this.dbName = options.dbName || 'CacheXDB';
    this.dbVersion = options.dbVersion || 1;
    this.db = null;
    
    // Check if storage is available
    this.isAvailable = this._checkStorageAvailability();
  }
  
  _checkStorageAvailability() {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      if (this.storageType === 'localStorage' && window.localStorage) {
        const testKey = '__cachex_storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
      }
      
      // Check IndexedDB availability
      if (this.storageType === 'indexedDB' && typeof window.indexedDB !== 'undefined') {
        return true;
      }
      
      return false;
    } catch (e) {
      console.warn('Storage not available:', e.message);
      return false;
    }
  }
  
  async _initIndexedDB() {
    if (!this.isAvailable || this.storageType !== 'indexedDB') {
      return;
    }
    
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = (event) => {
        console.warn('Error opening IndexedDB:', event.target.error);
        reject(event.target.error);
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        
        if (!this.db.objectStoreNames.contains('cache')) {
          const objectStore = this.db.createObjectStore('cache', { keyPath: 'key' });
          objectStore.createIndex('namespace', 'namespace', { unique: false });
          objectStore.createIndex('expires', 'expires', { unique: false });
        }
      };
    });
  }
  
  async get(key) {
    if (!this.isAvailable) {
      return undefined;
    }
    
    try {
      if (this.storageType === 'localStorage') {
        return this._getFromLocalStorage(key);
      } else if (this.storageType === 'indexedDB') {
        return await this._getFromIndexedDB(key);
      }
    } catch (e) {
      console.warn('Error reading from persistent cache:', e.message);
      return undefined;
    }
  }
  
  _getFromLocalStorage(key) {
    const fullKey = this._getFullKey(key);
    const itemStr = window.localStorage.getItem(fullKey);
    
    if (!itemStr) {
      return undefined;
    }
    
    const item = JSON.parse(itemStr);
    
    // Check if item has expired
    if (item.expires && Date.now() > item.expires) {
      this.delete(key);
      return undefined;
    }
    
    // Decompress if needed
    const value = this.compression ? this._decompress(item.value) : item.value;
    
    return value;
  }
  
  async _getFromIndexedDB(key) {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readonly');
      const objectStore = transaction.objectStore('cache');
      const request = objectStore.get(this._getFullKey(key));
      
      request.onsuccess = (event) => {
        const result = event.target.result;
        if (!result) {
          resolve(undefined);
          return;
        }
        
        // Check if item has expired
        if (result.expires && Date.now() > result.expires) {
          this.delete(key);
          resolve(undefined);
          return;
        }
        
        // Decompress if needed
        const value = this.compression ? this._decompress(result.value) : result.value;
        resolve(value);
      };
      
      request.onerror = (event) => {
        console.warn('Error reading from IndexedDB:', event.target.error);
        resolve(undefined);
      };
    });
  }
  
  async set(key, value, options = {}) {
    if (!this.isAvailable) {
      return;
    }
    
    try {
      if (this.storageType === 'localStorage') {
        this._setToLocalStorage(key, value, options);
      } else if (this.storageType === 'indexedDB') {
        await this._setToIndexedDB(key, value, options);
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
        console.warn('Storage quota exceeded. Clearing cache to make space.');
        this._handleQuotaExceeded();
      } else {
        console.warn('Error writing to persistent cache:', e.message);
      }
    }
  }
  
  _setToLocalStorage(key, value, options = {}) {
    const fullKey = this._getFullKey(key);
    
    // Compress if needed
    const storedValue = this.compression ? this._compress(value) : value;
    
    const item = {
      value: storedValue,
      createdAt: Date.now(),
      expires: options.ttl ? Date.now() + (options.ttl * 1000) : null
    };
    
    window.localStorage.setItem(fullKey, JSON.stringify(item));
  }
  
  async _setToIndexedDB(key, value, options = {}) {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    // Compress if needed
    const storedValue = this.compression ? this._compress(value) : value;
    
    const item = {
      key: this._getFullKey(key),
      value: storedValue,
      namespace: this.namespace,
      createdAt: Date.now(),
      expires: options.ttl ? Date.now() + (options.ttl * 1000) : null
    };
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readwrite');
      const objectStore = transaction.objectStore('cache');
      const request = objectStore.put(item);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        console.warn('Error writing to IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  _handleQuotaExceeded() {
    try {
      // Try to clear expired entries first
      this._clearExpiredEntries();
      
      // If still not enough space, clear all entries
      if (this._isQuotaStillExceeded()) {
        console.warn('Clearing all cache entries due to storage quota exceeded');
        this.clear();
      }
    } catch (e) {
      console.error('Error handling quota exceeded:', e.message);
    }
  }
  
  _clearExpiredEntries() {
    try {
      const now = Date.now();
      Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith(`${this.namespace}:`)) {
          try {
            const itemStr = window.localStorage.getItem(key);
            if (itemStr) {
              const item = JSON.parse(itemStr);
              if (item.expires && now > item.expires) {
                window.localStorage.removeItem(key);
              }
            }
          } catch (e) {
            // Remove corrupted entries
            window.localStorage.removeItem(key);
          }
        }
      });
    } catch (e) {
      console.warn('Error clearing expired entries:', e.message);
    }
  }
  
  _isQuotaStillExceeded() {
    try {
      const testKey = '__cachex_quota_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return false;
    } catch (e) {
      return true;
    }
  }
  
  async delete(key) {
    if (!this.isAvailable) {
      return;
    }
    
    try {
      if (this.storageType === 'localStorage') {
        const fullKey = this._getFullKey(key);
        window.localStorage.removeItem(fullKey);
      } else if (this.storageType === 'indexedDB') {
        await this._deleteFromIndexedDB(key);
      }
    } catch (e) {
      console.warn('Error deleting from persistent cache:', e.message);
    }
  }
  
  async _deleteFromIndexedDB(key) {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readwrite');
      const objectStore = transaction.objectStore('cache');
      const request = objectStore.delete(this._getFullKey(key));
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        console.warn('Error deleting from IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  async clear() {
    if (!this.isAvailable) {
      return;
    }
    
    try {
      if (this.storageType === 'localStorage') {
        Object.keys(window.localStorage).forEach(key => {
          if (key.startsWith(`${this.namespace}:`)) {
            window.localStorage.removeItem(key);
          }
        });
      } else if (this.storageType === 'indexedDB') {
        await this._clearIndexedDB();
      }
    } catch (e) {
      console.warn('Error clearing persistent cache:', e.message);
    }
  }
  
  async _clearIndexedDB() {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readwrite');
      const objectStore = transaction.objectStore('cache');
      const request = objectStore.index('namespace').openCursor(IDBKeyRange.only(this.namespace));
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      
      request.onerror = (event) => {
        console.warn('Error clearing IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  async has(key) {
    if (!this.isAvailable) {
      return false;
    }
    
    try {
      if (this.storageType === 'localStorage') {
        const fullKey = this._getFullKey(key);
        return window.localStorage.getItem(fullKey) !== null;
      } else if (this.storageType === 'indexedDB') {
        return await this._hasInIndexedDB(key);
      }
    } catch (e) {
      return false;
    }
  }
  
  async _hasInIndexedDB(key) {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readonly');
      const objectStore = transaction.objectStore('cache');
      const request = objectStore.getKey(this._getFullKey(key));
      
      request.onsuccess = (event) => {
        resolve(event.target.result !== undefined);
      };
      
      request.onerror = (event) => {
        console.warn('Error checking IndexedDB:', event.target.error);
        resolve(false);
      };
    });
  }
  
  async keys() {
    if (!this.isAvailable) {
      return [];
    }
    
    try {
      if (this.storageType === 'localStorage') {
        const prefix = `${this.namespace}:`;
        return Object.keys(window.localStorage)
          .filter(key => key.startsWith(prefix))
          .map(key => key.substring(prefix.length));
      } else if (this.storageType === 'indexedDB') {
        return await this._keysFromIndexedDB();
      }
    } catch (e) {
      return [];
    }
  }
  
  async _keysFromIndexedDB() {
    if (!this.db) {
      await this._initIndexedDB();
    }
    
    return new Promise((resolve, reject) => {
      const keys = [];
      const transaction = this.db.transaction(['cache'], 'readonly');
      const objectStore = transaction.objectStore('cache');
      const index = objectStore.index('namespace');
      const request = index.openCursor(IDBKeyRange.only(this.namespace));
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          keys.push(cursor.value.key.replace(`${this.namespace}:`, ''));
          cursor.continue();
        } else {
          resolve(keys);
        }
      };
      
      request.onerror = (event) => {
        console.warn('Error getting keys from IndexedDB:', event.target.error);
        resolve([]);
      };
    });
  }
  
  _getFullKey(key) {
    return `${this.namespace}:${key}`;
  }
  
  _compress(value) {
    // TODO: Implement compression logic
    return value;
  }
  
  _decompress(value) {
    // TODO: Implement decompression logic
    return value;
  }
}

export default PersistentCache;