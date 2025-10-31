class AnalyticsEngine {
  constructor() {
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      memoryUsage: 0,
      persistentUsage: 0
    };
    
    this.entryStats = new Map();
  }
  
  recordHit(key) {
    this.metrics.hits++;
    this._updateEntryStat(key, 'hits');
  }
  
  recordMiss(key) {
    this.metrics.misses++;
    this._updateEntryStat(key, 'misses');
  }
  
  recordSet(key) {
    this.metrics.sets++;
    this._updateEntryStat(key, 'sets');
  }
  
  recordDelete(key) {
    this.metrics.deletes++;
    this._updateEntryStat(key, 'deletes');
  }
  
  recordError(key, errorType) {
    this.metrics.errors++;
    this._updateEntryStat(key, 'errors', errorType);
  }
  
  updateMemoryUsage(usage) {
    this.metrics.memoryUsage = usage;
  }
  
  updatePersistentUsage(usage) {
    this.metrics.persistentUsage = usage;
  }
  
  _updateEntryStat(key, statType, detail = null) {
    if (!this.entryStats.has(key)) {
      this.entryStats.set(key, {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        errors: 0,
        firstAccess: Date.now(),
        lastAccess: Date.now()
      });
    }
    
    const entryStat = this.entryStats.get(key);
    entryStat[statType]++;
    entryStat.lastAccess = Date.now();
    
    if (detail) {
      if (!entryStat.errorDetails) {
        entryStat.errorDetails = [];
      }
      entryStat.errorDetails.push({
        type: detail,
        timestamp: Date.now()
      });
    }
  }
  
  getHitRatio() {
    const total = this.metrics.hits + this.metrics.misses;
    return total > 0 ? this.metrics.hits / total : 0;
  }
  
  getMetrics() {
    return {
      ...this.metrics,
      hitRatio: this.getHitRatio()
    };
  }
  
  getEntryStats(key) {
    return this.entryStats.get(key) || null;
  }
  
  getAllEntryStats() {
    return new Map(this.entryStats);
  }
  
  reset() {
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      memoryUsage: 0,
      persistentUsage: 0
    };
    
    this.entryStats.clear();
  }
  
  getReport() {
    const metrics = this.getMetrics();
    const totalAccesses = metrics.hits + metrics.misses;
    
    return `
CacheX Analytics Report
======================

Overall Metrics:
- Hits: ${metrics.hits}
- Misses: ${metrics.misses}
- Hit Ratio: ${(metrics.hitRatio * 100).toFixed(2)}%
- Total Accesses: ${totalAccesses}
- Sets: ${metrics.sets}
- Deletes: ${metrics.deletes}
- Errors: ${metrics.errors}

Resource Usage:
- Memory Usage: ${metrics.memoryUsage} bytes
- Persistent Storage Usage: ${metrics.persistentUsage} bytes
    `.trim();
  }
}

export default AnalyticsEngine;