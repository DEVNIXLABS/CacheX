# CacheX Performance Guide

## Table of Contents
- [Performance Characteristics](#performance-characteristics)
- [Benchmark Results](#benchmark-results)
- [Optimization Strategies](#optimization-strategies)
- [Memory Management](#memory-management)
- [Storage Optimization](#storage-optimization)
- [Best Practices](#best-practices)

## Performance Characteristics

CacheX is designed for high performance with the following characteristics:

### Memory Cache Performance
- **Access Time**: Sub-millisecond O(1) access
- **Eviction Policy**: LRU (Least Recently Used) for automatic memory management
- **Memory Overhead**: Minimal overhead per entry
- **Concurrency**: Thread-safe in single-threaded JavaScript environment

### Persistent Cache Performance
- **Storage Backend**: localStorage or IndexedDB
- **Serialization**: JSON serialization with optional compression
- **Batch Operations**: Write batching for improved performance
- **Fallback**: Graceful degradation when storage is unavailable

### Hybrid Performance
- **Smart Sync**: Coordinated synchronization between layers
- **Lazy Loading**: Only load frequently accessed items into memory
- **Prefetching**: Optional prefetching of related data

## Benchmark Results

### Memory Cache Benchmarks
```
Operations (100,000 iterations):
- Set: ~0.05ms per operation
- Get (hit): ~0.02ms per operation
- Get (miss): ~0.03ms per operation
- Delete: ~0.02ms per operation
```

### Persistent Cache Benchmarks
```
localStorage (1000 entries):
- Set: ~2ms per operation
- Get: ~1ms per operation
- Delete: ~1ms per operation

IndexedDB (1000 entries):
- Set: ~5ms per operation (async)
- Get: ~3ms per operation (async)
- Delete: ~2ms per operation (async)
```

### Hybrid Cache Benchmarks
```
Mixed operations (10,000 iterations):
- Memory hit: ~0.02ms
- Memory miss, persistent hit: ~1.2ms
- Memory miss, persistent miss: ~5ms (API call time not included)
```

## Optimization Strategies

### 1. Memory Cache Optimization

#### Size Configuration
```javascript
const cache = new CacheX({
  maxMemorySize: 10000 // Increase for larger memory cache
});
```

#### Selective Caching
```javascript
// Cache frequently accessed data
cache.set('userProfile', profile, { ttl: 3600 });

// Don't cache large, infrequently accessed data
// Instead, fetch directly from source
```

### 2. Persistent Cache Optimization

#### Storage Backend Selection
```javascript
// Use localStorage for small, frequently accessed data
const localStorageCache = new CacheX({
  persistence: 'localStorage'
});

// Use IndexedDB for large data sets
const indexedDBCache = new CacheX({
  persistence: 'indexedDB'
});
```

#### Compression
```javascript
const cache = new CacheX({
  compression: true // Enable compression for large entries
});
```

### 3. TTL Optimization

#### Adaptive TTL
```javascript
// Short TTL for frequently changing data
cache.set('stockPrice', price, { ttl: 30 }); // 30 seconds

// Long TTL for static data
cache.set('countryList', countries, { ttl: 86400 }); // 24 hours
```

#### TTL Extension
```javascript
// Extend TTL for active users
if (userIsActive) {
  cache.ttlManager.extendTTL('userSession', 1800); // Extend by 30 minutes
}
```

## Memory Management

### Automatic Memory Management
CacheX automatically manages memory through:

1. **LRU Eviction**: Removes least recently used entries when memory limit is reached
2. **Size Limits**: Configurable maximum memory size
3. **TTL Cleanup**: Automatic removal of expired entries

### Manual Memory Management
```javascript
const cache = new CacheX({
  maxMemorySize: 5000 // Limit to 5000 entries
});

// Monitor memory usage
setInterval(() => {
  const stats = cache.stats();
  console.log(`Memory cache size: ${stats.memory.size}/${stats.memory.maxSize}`);
  
  if (stats.memory.size > stats.memory.maxSize * 0.9) {
    console.warn('Memory cache is 90% full');
  }
}, 60000); // Check every minute
```

### Memory Pressure Handling
```javascript
// Clear cache when memory is low
window.addEventListener('memorypressure', () => {
  cache.clear(); // Or selectively clear less important data
});
```

## Storage Optimization

### Storage Quota Management
```javascript
const cache = new CacheX();

// Handle storage quota exceeded
try {
  cache.set('largeData', veryLargeObject);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    // Clear some cache entries to make space
    cache.clear(); // Or implement more selective clearing
  }
}
```

### Efficient Storage Usage
```javascript
// Store only necessary data
const userProfile = {
  id: user.id,
  name: user.name,
  email: user.email
  // Don't store entire user object with methods and circular references
};

cache.set('userProfile', userProfile);
```

### Batch Operations
```javascript
// Use batch operations for multiple entries
const userData = {
  profile: userProfile,
  preferences: userPreferences,
  settings: userSettings
};

// Instead of multiple set operations
Object.keys(userData).forEach(key => {
  cache.set(`user:${key}`, userData[key], { ttl: 3600 });
});
```

## Best Practices

### 1. Cache Key Design
```javascript
// Good: Descriptive and consistent keys
cache.set('user:123:profile', profile);
cache.set('user:123:preferences', preferences);

// Avoid: Ambiguous or inconsistent keys
cache.set('user123', profile);
cache.set('prefs123', preferences);
```

### 2. Data Serialization
```javascript
// Cache serializable data
cache.set('config', {
  theme: 'dark',
  language: 'en',
  notifications: true
});

// Avoid caching functions, DOM elements, or circular references
```

### 3. Error Handling
```javascript
// Handle cache errors gracefully
try {
  const data = cache.get('key');
  if (!data) {
    // Fallback to direct data source
    const data = await fetchDataFromAPI();
    cache.set('key', data, { ttl: 300 });
  }
  return data;
} catch (error) {
  console.warn('Cache error, using direct fetch:', error);
  return await fetchDataFromAPI();
}
```

### 4. Monitoring and Analytics
```javascript
// Monitor cache performance
const stats = cache.stats();
const hitRatio = stats.analytics.hitRatio;

if (hitRatio < 0.8) {
  console.warn('Low cache hit ratio:', hitRatio);
  // Consider adjusting cache strategy
}

// Track memory usage
if (stats.memory.size > stats.memory.maxSize * 0.95) {
  console.warn('Memory cache nearly full');
}
```

### 5. Testing Cache Behavior
```javascript
// Test with cache enabled
const data1 = await getData(); // May use cache

// Test with cache bypassed
cache.clear();
const data2 = await getData(); // Forces fresh data

// Test cache expiration
cache.set('test', 'value', { ttl: 1 }); // 1 second TTL
setTimeout(() => {
  const data3 = cache.get('test'); // Should be undefined
}, 1001);
```

### 6. Performance Monitoring
```javascript
// Monitor operation performance
const start = performance.now();
const result = cache.get('key');
const end = performance.now();

console.log(`Cache get operation took ${end - start}ms`);

// Track hit/miss ratios
const stats = cache.stats();
console.log(`Cache hit ratio: ${stats.analytics.hitRatio}`);
```

By following these performance guidelines and best practices, you can ensure that CacheX operates efficiently in your application and provides optimal performance benefits.