class SyncEngine {
  constructor(memoryCache, persistentCache, options = {}) {
    this.memoryCache = memoryCache;
    this.persistentCache = persistentCache;
    this.syncPolicy = options.syncPolicy || 'deferred';
    this.batchSize = options.batchSize || 10;
    
    this.pendingWrites = new Map();
    this.syncTimer = null;
  }
  
  syncToMemory(key) {
    const value = this.persistentCache.get(key);
    if (value !== undefined) {
      const metadata = {};
      
      this.memoryCache.set(key, value, metadata);
      return value;
    }
    
    return undefined;
  }
  
  syncToPersistent(key, value, options = {}) {
    switch (this.syncPolicy) {
      case 'immediate':
        this._immediateSync(key, value, options);
        break;
      case 'deferred':
        this._deferredSync(key, value, options);
        break;
      case 'conditional':
        this._conditionalSync(key, value, options);
        break;
      default:
        this._deferredSync(key, value, options);
    }
  }
  
  _immediateSync(key, value, options) {
    this.persistentCache.set(key, value, options);
  }
  
  _deferredSync(key, value, options) {
    this.pendingWrites.set(key, { value, options });
    
    if (!this.syncTimer) {
      this.syncTimer = setTimeout(() => {
        this._processPendingWrites();
      }, 100);
    }
  }
  
  _conditionalSync(key, value, options) {
    if (options.persist) {
      this._deferredSync(key, value, options);
    }
  }
  
  _processPendingWrites() {
    if (this.syncTimer) {
      clearTimeout(this.syncTimer);
      this.syncTimer = null;
    }
    
    const entries = Array.from(this.pendingWrites.entries());
    const batches = [];
    
    for (let i = 0; i < entries.length; i += this.batchSize) {
      batches.push(entries.slice(i, i + this.batchSize));
    }
    
    batches.forEach(batch => {
      batch.forEach(([key, { value, options }]) => {
        this.persistentCache.set(key, value, options);
      });
    });
    
    this.pendingWrites.clear();
  }
  
  preload(keys) {
    keys.forEach(key => {
      if (this.persistentCache.has(key) && !this.memoryCache.has(key)) {
        this.syncToMemory(key);
      }
    });
  }
  
  clear() {
    if (this.syncTimer) {
      clearTimeout(this.syncTimer);
      this.syncTimer = null;
    }
    
    this.pendingWrites.clear();
  }
}

export default SyncEngine;