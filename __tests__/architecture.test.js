const { 
  CacheX, 
  MemoryCache, 
  PersistentCache, 
  TTLManager, 
  SyncEngine,
  NamespaceManager,
  AnalyticsEngine,
  SecurityModule
} = require('../src/index.js');

describe('CacheX Architecture', () => {
  test('should import all components successfully', () => {
    expect(CacheX).toBeDefined();
    expect(MemoryCache).toBeDefined();
    expect(PersistentCache).toBeDefined();
    expect(TTLManager).toBeDefined();
    expect(SyncEngine).toBeDefined();
    expect(NamespaceManager).toBeDefined();
    expect(AnalyticsEngine).toBeDefined();
    expect(SecurityModule).toBeDefined();
  });

  test('should create CacheX instance', () => {
    const cache = new CacheX();
    expect(cache).toBeInstanceOf(CacheX);
  });

  test('should create MemoryCache instance', () => {
    const memoryCache = new MemoryCache();
    expect(memoryCache).toBeInstanceOf(MemoryCache);
  });

  test('should create PersistentCache instance', () => {
    const persistentCache = new PersistentCache();
    expect(persistentCache).toBeInstanceOf(PersistentCache);
  });

  test('should create TTLManager instance', () => {
    const ttlManager = new TTLManager();
    expect(ttlManager).toBeInstanceOf(TTLManager);
  });

  test('should create AnalyticsEngine instance', () => {
    const analytics = new AnalyticsEngine();
    expect(analytics).toBeInstanceOf(AnalyticsEngine);
  });
});