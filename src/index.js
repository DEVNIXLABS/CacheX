const CacheX = require('./core/CacheX.js');
const MemoryCache = require('./memory/MemoryCache.js');
const PersistentCache = require('./persistent/PersistentCache.js');
const TTLManager = require('./ttl/TTLManager.js');
const SyncEngine = require('./sync/SyncEngine.js');
const NamespaceManager = require('./namespace/NamespaceManager.js');
const AnalyticsEngine = require('./analytics/AnalyticsEngine.js');
const SecurityModule = require('./security/SecurityModule.js');

module.exports = {
  CacheX: CacheX.default || CacheX,
  MemoryCache: MemoryCache.default || MemoryCache,
  PersistentCache: PersistentCache.default || PersistentCache,
  TTLManager: TTLManager.default || TTLManager,
  SyncEngine: SyncEngine.default || SyncEngine,
  NamespaceManager: NamespaceManager.default || NamespaceManager,
  AnalyticsEngine: AnalyticsEngine.default || AnalyticsEngine,
  SecurityModule: SecurityModule.default || SecurityModule
};