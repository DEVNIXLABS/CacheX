import MemoryCache from '../memory/MemoryCache.js';
import PersistentCache from '../persistent/PersistentCache.js';
import TTLManager from '../ttl/TTLManager.js';
import SyncEngine from '../sync/SyncEngine.js';
import NamespaceManager from '../namespace/NamespaceManager.js';
import AnalyticsEngine from '../analytics/AnalyticsEngine.js';
import SecurityModule from '../security/SecurityModule.js';

class CacheX {
  constructor(options = {}) {
    this.options = {
      defaultTTL: options.defaultTTL || 300,
      maxMemorySize: options.maxMemorySize || 1000,
      persistence: options.persistence || 'localStorage',
      namespace: options.namespace || 'default',
      encryption: options.encryption || false,
      encryptionKey: options.encryptionKey || null,
      ...options
    };
    
    this._initComponents();
  }
  
  _initComponents() {
    this.memoryCache = new MemoryCache({
      maxSize: this.options.maxMemorySize
    });
    
    this.persistentCache = new PersistentCache({
      storageType: this.options.persistence,
      namespace: this.options.namespace
    });
    
    this.ttlManager = new TTLManager({
      defaultTTL: this.options.defaultTTL
    });
    
    this.analytics = new AnalyticsEngine();
    
    this.security = new SecurityModule({
      enabled: this.options.encryption,
      encryptionKey: this.options.encryptionKey
    });
    
    this.syncEngine = new SyncEngine(
      this.memoryCache,
      this.persistentCache,
      {
        syncPolicy: this.options.syncPolicy || 'deferred'
      }
    );
    
    this.namespaceManager = new NamespaceManager(this);
  }
  
  get(key) {
    let value = this.memoryCache.get(key);
    
    if (value !== undefined) {
      this.analytics.recordHit(key);
      return this.security.decrypt(value);
    }
    
    value = this.persistentCache.get(key);
    
    if (value !== undefined) {
      if (this.ttlManager.isExpired(key)) {
        this.delete(key);
        this.analytics.recordMiss(key);
        return undefined;
      }
      
      this.analytics.recordHit(key);
      value = this.security.decrypt(value);
      this.memoryCache.set(key, value);
      return value;
    }
    
    this.analytics.recordMiss(key);
    return undefined;
  }
  
  set(key, value, options = {}) {
    const opts = {
      ttl: this.options.defaultTTL,
      persist: true,
      encrypt: this.options.encryption,
      ...options
    };
    
    const processedValue = opts.encrypt ? this.security.encrypt(value) : value;
    
    this.memoryCache.set(key, processedValue, {
      ttl: opts.ttl
    });
    
    if (opts.ttl) {
      this.ttlManager.setTTL(key, opts.ttl, () => {
        this.delete(key);
      });
    }
    
    if (opts.persist) {
      this.syncEngine.syncToPersistent(key, processedValue, {
        ttl: opts.ttl,
        persist: opts.persist
      });
    }
    
    this.analytics.recordSet(key);
  }
  
  delete(key) {
    this.memoryCache.delete(key);
    this.persistentCache.delete(key);
    this.ttlManager.removeTTL(key);
    this.analytics.recordDelete(key);
  }
  
  clear() {
    this.memoryCache.clear();
    this.persistentCache.clear();
    this.ttlManager.clear();
    this.syncEngine.clear();
    this.analytics.reset();
  }
  
  has(key) {
    if (this.memoryCache.has(key)) {
      return !this.ttlManager.isExpired(key);
    }
    
    if (this.persistentCache.has(key)) {
      return !this.ttlManager.isExpired(key);
    }
    
    return false;
  }
  
  stats() {
    return {
      memory: {
        size: this.memoryCache.size(),
        maxSize: this.options.maxMemorySize
      },
      persistent: {
        size: this.persistentCache.keys().length
      },
      ttl: {
        trackedEntries: this.ttlManager.expiryCallbacks.size
      },
      analytics: this.analytics.getMetrics()
    };
  }
  
  createNamespace(name) {
    return this.namespaceManager.createNamespace(name);
  }
  
  useNamespace(name) {
    return this.namespaceManager.useNamespace(name);
  }
}

export default CacheX;