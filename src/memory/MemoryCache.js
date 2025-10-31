class MemoryCache {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 1000;
    this.cache = new Map();
    this.accessOrder = new Set();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      this.accessOrder.delete(key);
      this.accessOrder.add(key);
      return entry.value;
    }
    
    return undefined;
  }
  
  set(key, value, metadata = {}) {
    if (this.cache.size >= this.maxSize) {
      this._evictLRU();
    }
    
    this.cache.set(key, {
      value,
      ...metadata,
      lastAccessed: Date.now()
    });
    
    this.accessOrder.delete(key);
    this.accessOrder.add(key);
  }
  
  delete(key) {
    this.cache.delete(key);
    this.accessOrder.delete(key);
  }
  
  clear() {
    this.cache.clear();
    this.accessOrder.clear();
  }
  
  has(key) {
    return this.cache.has(key);
  }
  
  keys() {
    return Array.from(this.cache.keys());
  }
  
  _evictLRU() {
    const firstKey = this.accessOrder.values().next().value;
    if (firstKey) {
      this.delete(firstKey);
    }
  }
  
  size() {
    return this.cache.size;
  }
}

module.exports = MemoryCache;