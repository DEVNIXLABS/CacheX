# CacheX Examples

## Table of Contents
- [Basic Usage](#basic-usage)
- [Advanced Configuration](#advanced-configuration)
- [Namespaces](#namespaces)
- [Encryption](#encryption)
- [TTL Management](#ttl-management)
- [Analytics](#analytics)
- [Framework Integration](#framework-integration)

## Basic Usage

### Simple Caching

```javascript
import CacheX from 'cachex';

// Create a cache instance
const cache = new CacheX();

// Store data
cache.set('user', { id: 1, name: 'John Doe' });

// Retrieve data
const user = cache.get('user');
console.log(user); // { id: 1, name: 'John Doe' }

// Check if key exists
if (cache.has('user')) {
  console.log('User exists in cache');
}

// Delete data
cache.delete('user');

// Clear all cache
cache.clear();
```

### With TTL (Time-To-Live)

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Store data with 1 hour TTL
cache.set('apiResponse', { data: '...' }, { ttl: 3600 });

// Store data with default TTL (5 minutes)
cache.set('tempData', { temp: 'value' });

// Get data (automatically checks expiration)
const data = cache.get('apiResponse');
```

## Advanced Configuration

### Custom Configuration

```javascript
import CacheX from 'cachex';

const cache = new CacheX({
  defaultTTL: 600,        // 10 minutes
  maxMemorySize: 5000,    // 5000 entries in memory
  persistence: 'indexedDB', // Use IndexedDB for persistence
  namespace: 'myapp',
  syncPolicy: 'deferred'  // Defer writes to persistent storage
});

// Store data that won't be persisted
cache.set('sessionData', { user: '...' }, { persist: false });

// Store data with custom TTL
cache.set('longTermData', { config: '...' }, { ttl: 86400 }); // 24 hours
```

### Storage Backend Selection

```javascript
import CacheX from 'cachex';

// Use localStorage (default)
const localStorageCache = new CacheX({
  persistence: 'localStorage'
});

// Use IndexedDB for larger data sets
const indexedDBCache = new CacheX({
  persistence: 'indexedDB'
});

// Store large data in IndexedDB
indexedDBCache.set('largeDataset', largeArray, { ttl: 7200 }); // 2 hours
```

## Namespaces

### Creating and Using Namespaces

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Create namespaces for different modules
const authCache = cache.createNamespace('auth');
const userCache = cache.createNamespace('user');
const configCache = cache.createNamespace('config');

// Use namespaces
authCache.set('token', 'abc123');
userCache.set('profile', { name: 'John', email: 'john@example.com' });
configCache.set('theme', 'dark');

// Retrieve from specific namespaces
const token = authCache.get('token');
const profile = userCache.get('profile');
const theme = configCache.get('theme');

// Switch between namespaces
cache.useNamespace('auth');
const token2 = cache.get('token'); // Gets from auth namespace

cache.useNamespace('user');
const profile2 = cache.get('profile'); // Gets from user namespace
```

### Namespace Isolation

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Same key in different namespaces
const authCache = cache.createNamespace('auth');
const userCache = cache.createNamespace('user');

authCache.set('id', 'auth-token-123');
userCache.set('id', { userId: 456, name: 'John' });

// Keys are isolated between namespaces
console.log(authCache.get('id')); // 'auth-token-123'
console.log(userCache.get('id')); // { userId: 456, name: 'John' }
```

## Encryption

### Basic Encryption

```javascript
import CacheX from 'cachex';

const cache = new CacheX({
  encryption: true,
  encryptionKey: 'my-secret-key-32-chars-long!!'
});

// Sensitive data will be automatically encrypted
cache.set('userToken', 'secret-jwt-token');
cache.set('userCredentials', { username: 'john', password: 'secret123' });

// Data is automatically decrypted when retrieved
const token = cache.get('userToken');
const credentials = cache.get('userCredentials');
```

### Advanced Encryption

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Enable encryption dynamically
const securityKey = cache.security.generateKey(32);
cache.security.enable(securityKey);

// Store sensitive data
cache.set('creditCard', { number: '1234-5678-9012-3456', cvv: '123' });

// Store non-sensitive data without encryption
cache.set('userName', 'John Doe', { encrypt: false });

// Selective encryption
cache.set('sensitiveData', { ssn: '123-45-6789' }, { encrypt: true });
cache.set('publicData', { displayName: 'John' }, { encrypt: false });
```

## TTL Management

### Different TTL Strategies

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Short-term cache (1 minute)
cache.set('searchQuery', 'javascript cache', { ttl: 60 });

// Medium-term cache (1 hour)
cache.set('userProfile', { name: 'John', age: 30 }, { ttl: 3600 });

// Long-term cache (1 day)
cache.set('appConfig', { theme: 'dark', language: 'en' }, { ttl: 86400 });

// Permanent cache (no expiration)
cache.set('appVersion', '1.2.3'); // Uses default TTL
// To make truly permanent, set a very long TTL
cache.set('appVersion', '1.2.3', { ttl: 31536000 }); // 1 year
```

### Manual TTL Extension

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Store data with TTL
cache.set('session', { userId: 123 }, { ttl: 1800 }); // 30 minutes

// Extend TTL when user is active
setTimeout(() => {
  // Extend session for another 30 minutes
  cache.ttlManager.extendTTL('session', 1800);
}, 900000); // After 15 minutes
```

## Analytics

### Monitoring Cache Performance

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Perform cache operations
cache.set('key1', 'value1');
cache.get('key1'); // Hit
cache.get('key2'); // Miss
cache.set('key2', 'value2');
cache.get('key2'); // Hit

// Get cache statistics
const stats = cache.stats();
console.log(stats);
/*
{
  memory: { size: 2, maxSize: 1000 },
  persistent: { size: 2 },
  ttl: { trackedEntries: 0 },
  analytics: {
    hits: 2,
    misses: 1,
    sets: 2,
    deletes: 0,
    errors: 0,
    hitRatio: 0.6667
  }
}
*/

// Get detailed report
console.log(cache.analytics.getReport());
```

### Custom Analytics Tracking

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Track custom metrics
cache.analytics.updateMemoryUsage(1024); // 1KB
cache.analytics.updatePersistentUsage(2048); // 2KB

// Record custom errors
try {
  // Some operation that might fail
  cache.set('key', complexObject);
} catch (error) {
  cache.analytics.recordError('key', 'serialization_error');
}

// Get entry-specific statistics
const entryStats = cache.analytics.getEntryStats('key');
console.log(entryStats);
```

## Framework Integration

### Vanilla JavaScript/HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>CacheX Example</title>
</head>
<body>
    <div id="app">
        <button id="loadData">Load Data</button>
        <div id="content"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/cachex@latest/dist/cachex.min.js"></script>
    <script>
        // Initialize cache
        const cache = new CacheX.default({
            defaultTTL: 300, // 5 minutes
            namespace: 'myapp'
        });

        document.getElementById('loadData').addEventListener('click', async () => {
            const contentDiv = document.getElementById('content');
            
            // Try to get from cache first
            let data = cache.get('apiData');
            
            if (!data) {
                // Fetch from API if not in cache
                try {
                    const response = await fetch('/api/data');
                    data = await response.json();
                    
                    // Store in cache
                    cache.set('apiData', data, { ttl: 60 }); // Cache for 1 minute
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                    return;
                }
            }
            
            // Display data
            contentDiv.innerHTML = JSON.stringify(data, null, 2);
        });
    </script>
</body>
</html>
```

### Integration with Async Operations

```javascript
import CacheX from 'cachex';

class DataService {
  constructor() {
    this.cache = new CacheX({
      defaultTTL: 300,
      persistence: 'indexedDB'
    });
  }
  
  async getUser(userId) {
    const cacheKey = `user:${userId}`;
    
    // Try cache first
    let user = this.cache.get(cacheKey);
    if (user) {
      return user;
    }
    
    // Fetch from API
    try {
      const response = await fetch(`/api/users/${userId}`);
      user = await response.json();
      
      // Store in cache
      this.cache.set(cacheKey, user, { ttl: 600 }); // 10 minutes
      
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user ${userId}: ${error.message}`);
    }
  }
  
  async getRecentUsers() {
    const cacheKey = 'recentUsers';
    
    // Try cache first
    let users = this.cache.get(cacheKey);
    if (users) {
      return users;
    }
    
    // Fetch from API
    try {
      const response = await fetch('/api/users/recent');
      users = await response.json();
      
      // Store in cache with shorter TTL for frequently changing data
      this.cache.set(cacheKey, users, { ttl: 60 }); // 1 minute
      
      return users;
    } catch (error) {
      throw new Error(`Failed to fetch recent users: ${error.message}`);
    }
  }
  
  invalidateUser(userId) {
    const cacheKey = `user:${userId}`;
    this.cache.delete(cacheKey);
  }
  
  clearAll() {
    this.cache.clear();
  }
}

// Usage
const dataService = new DataService();

// Get user (first time - fetches from API)
const user1 = await dataService.getUser(123);

// Get same user (second time - from cache)
const user2 = await dataService.getUser(123);

// Invalidate cache for user
dataService.invalidateUser(123);
```

### Performance Monitoring Example

```javascript
import CacheX from 'cachex';

class PerformanceMonitoredCache {
  constructor() {
    this.cache = new CacheX();
    this.performanceLog = [];
  }
  
  get(key) {
    const start = performance.now();
    const result = this.cache.get(key);
    const end = performance.now();
    
    this.performanceLog.push({
      operation: 'get',
      key,
      duration: end - start,
      hit: result !== undefined,
      timestamp: Date.now()
    });
    
    return result;
  }
  
  set(key, value, options) {
    const start = performance.now();
    this.cache.set(key, value, options);
    const end = performance.now();
    
    this.performanceLog.push({
      operation: 'set',
      key,
      duration: end - start,
      timestamp: Date.now()
    });
  }
  
  getPerformanceReport() {
    const totalOperations = this.performanceLog.length;
    const totalDuration = this.performanceLog.reduce((sum, op) => sum + op.duration, 0);
    const avgDuration = totalDuration / totalOperations;
    
    const getOps = this.performanceLog.filter(op => op.operation === 'get');
    const hitOps = getOps.filter(op => op.hit);
    const hitRatio = getOps.length > 0 ? hitOps.length / getOps.length : 0;
    
    return {
      totalOperations,
      averageDuration: avgDuration.toFixed(2) + 'ms',
      hitRatio: (hitRatio * 100).toFixed(2) + '%',
      operations: this.performanceLog.slice(-10) // Last 10 operations
    };
  }
}

// Usage
const monitoredCache = new PerformanceMonitoredCache();

// Perform operations
monitoredCache.set('key1', 'value1');
monitoredCache.set('key2', 'value2');
monitoredCache.get('key1'); // Hit
monitoredCache.get('key3'); // Miss

// Get performance report
console.log(monitoredCache.getPerformanceReport());
```