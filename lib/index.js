"use strict";

/**
 * CacheX - The Hybrid Caching Engine for Modern JavaScript Apps
 * 
 * Main entry point
 */

var CacheX = require('./core/CacheX.js');
var MemoryCache = require('./memory/MemoryCache.js');
var PersistentCache = require('./persistent/PersistentCache.js');
var TTLManager = require('./ttl/TTLManager.js');
var SyncEngine = require('./sync/SyncEngine.js');
var NamespaceManager = require('./namespace/NamespaceManager.js');
var AnalyticsEngine = require('./analytics/AnalyticsEngine.js');
var SecurityModule = require('./security/SecurityModule.js');

// Export all components
module.exports = {
  CacheX: CacheX["default"] || CacheX,
  MemoryCache: MemoryCache["default"] || MemoryCache,
  PersistentCache: PersistentCache["default"] || PersistentCache,
  TTLManager: TTLManager["default"] || TTLManager,
  SyncEngine: SyncEngine["default"] || SyncEngine,
  NamespaceManager: NamespaceManager["default"] || NamespaceManager,
  AnalyticsEngine: AnalyticsEngine["default"] || AnalyticsEngine,
  SecurityModule: SecurityModule["default"] || SecurityModule
};