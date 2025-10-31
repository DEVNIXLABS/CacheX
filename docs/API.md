# CacheX API Reference

## Table of Contents
- [CacheX Class](#cachex-class)
- [MemoryCache Class](#memorycache-class)
- [PersistentCache Class](#persistentcache-class)
- [TTLManager Class](#ttlmanager-class)
- [SyncEngine Class](#syncengine-class)
- [NamespaceManager Class](#namespacemanager-class)
- [AnalyticsEngine Class](#analyticsengine-class)
- [SecurityModule Class](#securitymodule-class)

## CacheX Class

The main CacheX class that orchestrates the hybrid caching system.

### Constructor

```javascript
new CacheX(options)
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `defaultTTL` (number): Default time-to-live in seconds (default: 300)
  - `maxMemorySize` (number): Maximum number of entries in memory cache (default: 1000)
  - `persistence` (string): Storage backend ('localStorage' or 'indexedDB') (default: 'localStorage')
  - `namespace` (string): Namespace for cache entries (default: 'default')
  - `encryption` (boolean): Enable encryption (default: false)
  - `encryptionKey` (string): Encryption key (default: null)
  - `syncPolicy` (string): Sync policy ('immediate', 'deferred', 'conditional') (default: 'deferred')

### Methods

#### get(key)
Retrieve a value from cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Cached value or undefined

#### set(key, value, options)
Store a value in cache.

**Parameters:**
- `key` (string): Cache key
- `value` (*): Value to cache
- `options` (Object, optional): Cache options
  - `ttl` (number): Time-to-live in seconds
  - `persist` (boolean): Whether to persist to storage (default: true)
  - `encrypt` (boolean): Whether to encrypt (default: false)

#### delete(key)
Delete a cache entry.

**Parameters:**
- `key` (string): Cache key to delete

#### clear()
Clear all cache entries.

#### has(key)
Check if key exists in cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Boolean indicating if key exists

#### stats()
Get cache statistics.

**Returns:** Object with cache statistics

#### createNamespace(name)
Create a new namespace.

**Parameters:**
- `name` (string): Namespace name

**Returns:** New CacheX instance for namespace

#### useNamespace(name)
Switch to a specific namespace.

**Parameters:**
- `name` (string): Namespace name

**Returns:** CacheX instance for namespace

## MemoryCache Class

Ultra-fast in-memory cache using JavaScript Map.

### Constructor

```javascript
new MemoryCache(options)
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `maxSize` (number): Maximum number of entries (default: 1000)

### Methods

#### get(key)
Get a value from memory cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Cached value or undefined

#### set(key, value, metadata)
Set a value in memory cache.

**Parameters:**
- `key` (string): Cache key
- `value` (*): Value to cache
- `metadata` (Object, optional): Entry metadata

#### delete(key)
Delete a cache entry.

**Parameters:**
- `key` (string): Cache key to delete

#### clear()
Clear all cache entries.

#### has(key)
Check if key exists in cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Boolean indicating if key exists

#### keys()
Get all cache keys.

**Returns:** Array of cache keys

#### size()
Get cache size.

**Returns:** Number of entries in cache

## PersistentCache Class

Storage adapter for localStorage and IndexedDB.

### Constructor

```javascript
new PersistentCache(options)
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `storageType` (string): Storage type ('localStorage' or 'indexedDB') (default: 'localStorage')
  - `namespace` (string): Namespace for cache entries (default: 'cachex')
  - `compression` (boolean): Enable compression (default: false)

### Methods

#### get(key)
Get a value from persistent cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Cached value or undefined

#### set(key, value, options)
Set a value in persistent cache.

**Parameters:**
- `key` (string): Cache key
- `value` (*): Value to cache
- `options` (Object, optional): Cache options
  - `ttl` (number): Time-to-live in seconds

#### delete(key)
Delete a cache entry.

**Parameters:**
- `key` (string): Cache key to delete

#### clear()
Clear all cache entries.

#### has(key)
Check if key exists in cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Boolean indicating if key exists

#### keys()
Get all cache keys.

**Returns:** Array of cache keys

## TTLManager Class

Time-to-live management for cache entries.

### Constructor

```javascript
new TTLManager(options)
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `defaultTTL` (number): Default TTL in seconds (default: 300)
  - `cleanupInterval` (number): Cleanup interval in milliseconds (default: 60000)

### Methods

#### setTTL(key, ttl, callback)
Set TTL for a cache entry.

**Parameters:**
- `key` (string): Cache key
- `ttl` (number): Time-to-live in seconds
- `callback` (Function): Callback when entry expires

#### isExpired(key)
Check if entry has expired.

**Parameters:**
- `key` (string): Cache key

**Returns:** Boolean indicating if entry has expired

#### getRemainingTTL(key)
Get remaining TTL for entry.

**Parameters:**
- `key` (string): Cache key

**Returns:** Remaining TTL in seconds, or null if no TTL

#### removeTTL(key)
Remove TTL for entry.

**Parameters:**
- `key` (string): Cache key

#### clear()
Clear all TTL entries.

#### extendTTL(key, ttl)
Extend TTL for entry.

**Parameters:**
- `key` (string): Cache key
- `ttl` (number): New TTL in seconds

## SyncEngine Class

Coordinates synchronization between memory and persistent cache layers.

### Constructor

```javascript
new SyncEngine(memoryCache, persistentCache, options)
```

**Parameters:**
- `memoryCache` (MemoryCache): Memory cache instance
- `persistentCache` (PersistentCache): Persistent cache instance
- `options` (Object, optional): Configuration options
  - `syncPolicy` (string): Sync policy ('immediate', 'deferred', 'conditional') (default: 'deferred')
  - `batchSize` (number): Batch size for writes (default: 10)

### Methods

#### syncToMemory(key)
Sync entry from persistent to memory cache.

**Parameters:**
- `key` (string): Cache key

**Returns:** Value if found and synced, undefined otherwise

#### syncToPersistent(key, value, options)
Sync entry from memory to persistent cache.

**Parameters:**
- `key` (string): Cache key
- `value` (*): Value to sync
- `options` (Object): Sync options

#### preload(keys)
Load frequently accessed items into memory.

**Parameters:**
- `keys` (Array): Keys to preload

#### clear()
Clear sync state.

## NamespaceManager Class

Manages isolated cache namespaces.

### Constructor

```javascript
new NamespaceManager(cacheX)
```

**Parameters:**
- `cacheX` (CacheX): Main CacheX instance

### Methods

#### createNamespace(name)
Create a new namespace.

**Parameters:**
- `name` (string): Namespace name

**Returns:** New namespace instance

#### useNamespace(name)
Switch to a specific namespace.

**Parameters:**
- `name` (string): Namespace name

**Returns:** Namespace instance

#### getCurrentNamespace()
Get current namespace instance.

**Returns:** Current namespace instance

#### deleteNamespace(name)
Delete a namespace.

**Parameters:**
- `name` (string): Namespace name

#### listNamespaces()
List all namespaces.

**Returns:** Array of namespace names

#### clearAll()
Clear all namespaces.

## AnalyticsEngine Class

Tracks cache performance metrics.

### Constructor

```javascript
new AnalyticsEngine()
```

### Methods

#### recordHit(key)
Record a cache hit.

**Parameters:**
- `key` (string): Cache key

#### recordMiss(key)
Record a cache miss.

**Parameters:**
- `key` (string): Cache key

#### recordSet(key)
Record a cache set operation.

**Parameters:**
- `key` (string): Cache key

#### recordDelete(key)
Record a cache delete operation.

**Parameters:**
- `key` (string): Cache key

#### recordError(key, errorType)
Record a cache error.

**Parameters:**
- `key` (string): Cache key
- `errorType` (string): Type of error

#### updateMemoryUsage(usage)
Update memory usage metric.

**Parameters:**
- `usage` (number): Memory usage in bytes

#### updatePersistentUsage(usage)
Update persistent storage usage metric.

**Parameters:**
- `usage` (number): Storage usage in bytes

#### getHitRatio()
Get cache hit ratio.

**Returns:** Hit ratio (0-1)

#### getMetrics()
Get all metrics.

**Returns:** Current metrics

#### getEntryStats(key)
Get entry-specific statistics.

**Parameters:**
- `key` (string): Cache key

**Returns:** Entry statistics

#### getAllEntryStats()
Get all entry statistics.

**Returns:** All entry statistics

#### reset()
Reset all metrics.

#### getReport()
Get formatted report.

**Returns:** Formatted analytics report

## SecurityModule Class

Provides encryption for sensitive cache entries.

### Constructor

```javascript
new SecurityModule(options)
```

**Parameters:**
- `options` (Object, optional): Configuration options
  - `enabled` (boolean): Enable encryption (default: false)
  - `encryptionKey` (string): Encryption key (default: null)
  - `algorithm` (string): Encryption algorithm (default: 'AES')

### Methods

#### encrypt(data)
Encrypt data.

**Parameters:**
- `data` (*): Data to encrypt

**Returns:** Encrypted data

#### decrypt(encryptedData)
Decrypt data.

**Parameters:**
- `encryptedData` (string): Encrypted data

**Returns:** Decrypted data

#### generateKey(length)
Generate a secure encryption key.

**Parameters:**
- `length` (number): Key length in bytes (default: 32)

**Returns:** Generated key

#### enable(key)
Enable encryption.

**Parameters:**
- `key` (string): Encryption key

#### disable()
Disable encryption.

#### setAlgorithm(algorithm)
Set encryption algorithm.

**Parameters:**
- `algorithm` (string): Encryption algorithm ('AES' or 'XOR')