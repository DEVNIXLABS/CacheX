class TTLManager {
  constructor(options = {}) {
    this.defaultTTL = options.defaultTTL || 300;
    this.cleanupInterval = options.cleanupInterval || 60000;
    this.expiryCallbacks = new Map();
    this.cleanupTimer = null;
    
    this._startCleanupTimer();
  }
  
  setTTL(key, ttl, callback) {
    const expiresAt = Date.now() + (ttl * 1000);
    
    this.expiryCallbacks.set(key, {
      expiresAt,
      callback
    });
  }
  
  isExpired(key) {
    const expiryInfo = this.expiryCallbacks.get(key);
    if (!expiryInfo) {
      return false;
    }
    
    return Date.now() > expiryInfo.expiresAt;
  }
  
  getRemainingTTL(key) {
    const expiryInfo = this.expiryCallbacks.get(key);
    if (!expiryInfo) {
      return null;
    }
    
    const remaining = expiryInfo.expiresAt - Date.now();
    return Math.max(0, Math.floor(remaining / 1000));
  }
  
  removeTTL(key) {
    this.expiryCallbacks.delete(key);
    
    // Stop cleanup timer if no entries left
    if (this.expiryCallbacks.size === 0 && this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
  
  clear() {
    this.expiryCallbacks.clear();
    
    // Stop cleanup timer when clearing all entries
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
  
  _startCleanupTimer() {
    // Only start timer if it's not already running
    if (!this.cleanupTimer) {
      this.cleanupTimer = setInterval(() => {
        this._cleanupExpiredEntries();
      }, this.cleanupInterval);
    }
  }
  
  _cleanupExpiredEntries() {
    // Don't run cleanup if no entries to check
    if (this.expiryCallbacks.size === 0) {
      if (this.cleanupTimer) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
      return;
    }
    
    const now = Date.now();
    const expiredKeys = [];
    
    for (const [key, expiryInfo] of this.expiryCallbacks.entries()) {
      if (now > expiryInfo.expiresAt) {
        expiredKeys.push({ key, callback: expiryInfo.callback });
      }
    }
    
    expiredKeys.forEach(({ key, callback }) => {
      this.expiryCallbacks.delete(key);
      
      if (typeof callback === 'function') {
        try {
          callback(key);
        } catch (e) {
          console.warn('Error in TTL expiry callback:', e);
        }
      }
    });
  }
  
  extendTTL(key, ttl) {
    const expiryInfo = this.expiryCallbacks.get(key);
    if (expiryInfo) {
      expiryInfo.expiresAt = Date.now() + (ttl * 1000);
    }
  }
}

export default TTLManager;