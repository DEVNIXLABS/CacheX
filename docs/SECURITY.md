# CacheX Security Guide

## Table of Contents
- [Security Features](#security-features)
- [Encryption](#encryption)
- [Key Management](#key-management)
- [Data Protection](#data-protection)
- [Secure Configuration](#secure-configuration)
- [Best Practices](#best-practices)
- [Threat Model](#threat-model)

## Security Features

CacheX provides several security features to protect your cached data:

1. **Encryption**: Optional encryption for sensitive cache entries
2. **Key Management**: Secure key generation and management
3. **Access Control**: Namespace isolation to prevent cross-contamination
4. **Data Validation**: Input validation to prevent injection attacks
5. **Secure Storage**: Proper handling of data in persistent storage

## Encryption

### Encryption Algorithms

CacheX supports two encryption algorithms:

1. **AES** (Recommended): Industry-standard encryption (placeholder implementation)
2. **XOR** (For demonstration): Simple XOR encryption (NOT for production use)

### Enabling Encryption

```javascript
import CacheX from 'cachex';

// Enable encryption with a strong key
const cache = new CacheX({
  encryption: true,
  encryptionKey: 'your-32-character-secret-key-here'
});

// Store sensitive data (automatically encrypted)
cache.set('userToken', 'secret-jwt-token');
cache.set('userCredentials', { username: 'john', password: 'secret123' });
```

### Selective Encryption

```javascript
const cache = new CacheX();

// Enable encryption
cache.security.enable('your-secret-key');

// Store sensitive data with encryption
cache.set('creditCard', { number: '1234-5678-9012-3456' }, { encrypt: true });

// Store non-sensitive data without encryption
cache.set('userName', 'John Doe', { encrypt: false });
```

### Warning About XOR Encryption

```javascript
// XOR encryption is NOT secure and should NOT be used in production
const cache = new CacheX({
  encryption: true,
  encryptionKey: 'weak-key',
  algorithm: 'XOR' // This will show warnings
});

// CacheX will warn about insecure encryption
console.warn('WARNING: Simple XOR encryption is NOT secure and should NOT be used in production.');
```

## Key Management

### Generating Strong Keys

```javascript
import CacheX from 'cachex';

const cache = new CacheX();

// Generate a cryptographically secure key
const secureKey = cache.security.generateKey(32); // 32 bytes = 256 bits
cache.security.enable(secureKey);

// Store the key securely (e.g., in environment variables)
// Never hardcode keys in your source code
```

### Key Rotation

```javascript
class SecureCacheManager {
  constructor() {
    this.cache = new CacheX();
    this.currentKey = this.loadOrGenerateKey();
    this.cache.security.enable(this.currentKey);
  }
  
  loadOrGenerateKey() {
    // Load key from secure storage or generate new one
    let key = this.loadKeyFromSecureStorage();
    if (!key) {
      key = this.cache.security.generateKey(32);
      this.saveKeyToSecureStorage(key);
    }
    return key;
  }
  
  rotateKey() {
    // Generate new key
    const newKey = this.cache.security.generateKey(32);
    
    // Re-encrypt existing data with new key
    this.reencryptData(newKey);
    
    // Update current key
    this.currentKey = newKey;
    this.cache.security.enable(newKey);
    
    // Save new key to secure storage
    this.saveKeyToSecureStorage(newKey);
  }
  
  reencryptData(newKey) {
    // Implementation depends on your specific use case
    // This is a simplified example
    const oldCache = { ...this.cache.memoryCache.cache };
    
    oldCache.forEach((entry, key) => {
      if (entry.encrypted) {
        // Decrypt with old key and re-encrypt with new key
        const decrypted = this.cache.security.decrypt(entry.value);
        this.cache.set(key, decrypted, { encrypt: true });
      }
    });
  }
}
```

### Secure Key Storage

```javascript
// DO: Store keys in environment variables
const ENCRYPTION_KEY = process.env.CACHE_ENCRYPTION_KEY;

const cache = new CacheX({
  encryption: true,
  encryptionKey: ENCRYPTION_KEY
});

// DO: Store keys in secure storage (Node.js example)
const fs = require('fs');
const key = fs.readFileSync('/secure/location/encryption.key', 'utf8');

// DON'T: Hardcode keys in source code
const cache = new CacheX({
  encryption: true,
  encryptionKey: 'hardcoded-key-in-source-code' // NEVER do this
});
```

## Data Protection

### Sensitive Data Handling

```javascript
const cache = new CacheX({
  encryption: true,
  encryptionKey: process.env.ENCRYPTION_KEY
});

// Cache sensitive data with encryption
cache.set('user:ssn:123', '123-45-6789', { encrypt: true });
cache.set('user:credit-card:123', { number: '1234', expiry: '12/25' }, { encrypt: true });

// Cache non-sensitive data without encryption
cache.set('user:name:123', 'John Doe', { encrypt: false });
cache.set('user:preferences:123', { theme: 'dark', language: 'en' }, { encrypt: false });
```

### Data Validation

```javascript
class SecureCache extends CacheX {
  set(key, value, options = {}) {
    // Validate inputs
    if (typeof key !== 'string' || key.length === 0) {
      throw new Error('Invalid cache key');
    }
    
    if (value === undefined) {
      throw new Error('Cannot cache undefined values');
    }
    
    // Sanitize data
    const sanitizedValue = this.sanitizeData(value);
    
    // Call parent set method
    super.set(key, sanitizedValue, options);
  }
  
  sanitizeData(data) {
    // Remove potentially dangerous properties
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data };
      
      // Remove functions
      Object.keys(sanitized).forEach(key => {
        if (typeof sanitized[key] === 'function') {
          delete sanitized[key];
        }
      });
      
      return sanitized;
    }
    
    return data;
  }
}
```

## Secure Configuration

### Environment-Based Configuration

```javascript
// config.js
const config = {
  development: {
    encryption: false, // No encryption in development
    persistence: 'localStorage'
  },
  production: {
    encryption: true, // Enable encryption in production
    encryptionKey: process.env.CACHE_ENCRYPTION_KEY,
    persistence: 'indexedDB'
  }
};

export default config[process.env.NODE_ENV || 'development'];
```

### Secure Cache Initialization

```javascript
import CacheX from 'cachex';
import config from './config.js';

const cache = new CacheX(config);

// Additional security measures
if (config.encryption && !config.encryptionKey) {
  console.warn('Encryption enabled but no key provided. Generating temporary key.');
  const tempKey = cache.security.generateKey(32);
  cache.security.enable(tempKey);
}
```

## Best Practices

### 1. Key Security
```javascript
// DO: Use strong, randomly generated keys
const strongKey = cache.security.generateKey(32);

// DO: Store keys securely
const key = process.env.ENCRYPTION_KEY;

// DON'T: Use weak or predictable keys
const weakKey = 'password123';
const predictableKey = 'abcdefghijklmnopqrstuvwxzy123456';
```

### 2. Data Classification
```javascript
// Classify data by sensitivity
const DATA_CLASSIFICATION = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  SENSITIVE: 'sensitive',
  CONFIDENTIAL: 'confidential'
};

// Apply appropriate security measures
const cachePolicies = {
  [DATA_CLASSIFICATION.PUBLIC]: { encrypt: false, ttl: 3600 },
  [DATA_CLASSIFICATION.INTERNAL]: { encrypt: false, ttl: 1800 },
  [DATA_CLASSIFICATION.SENSITIVE]: { encrypt: true, ttl: 600 },
  [DATA_CLASSIFICATION.CONFIDENTIAL]: { encrypt: true, ttl: 300 }
};

function cacheData(key, data, classification) {
  const policy = cachePolicies[classification];
  cache.set(key, data, policy);
}
```

### 3. Access Control
```javascript
// Use namespaces for isolation
const userCache = cache.createNamespace(`user:${userId}`);
const appCache = cache.createNamespace('app');

// Store user-specific data in isolated namespace
userCache.set('profile', userProfile);
userCache.set('preferences', userPreferences);

// Store application data in separate namespace
appCache.set('config', appConfig);
```

### 4. Monitoring and Auditing
```javascript
class AuditedCache extends CacheX {
  constructor(options) {
    super(options);
    this.auditLog = [];
  }
  
  set(key, value, options = {}) {
    this.auditLog.push({
      operation: 'SET',
      key,
      timestamp: Date.now(),
      encrypted: options.encrypt || this.options.encryption
    });
    
    super.set(key, value, options);
  }
  
  get(key) {
    this.auditLog.push({
      operation: 'GET',
      key,
      timestamp: Date.now()
    });
    
    return super.get(key);
  }
  
  getAuditLog() {
    return this.auditLog;
  }
}
```

### 5. Error Handling
```javascript
try {
  cache.set('sensitiveData', userData, { encrypt: true });
} catch (error) {
  // Log security-related errors
  if (error.message.includes('encryption')) {
    console.error('Encryption error:', error);
    // Consider alerting security team
  }
  
  // Don't expose sensitive information in error messages
  throw new Error('Cache operation failed');
}
```

## Threat Model

### Potential Threats

1. **Data Theft**: Unauthorized access to cached data
2. **Key Compromise**: Exposure of encryption keys
3. **Injection Attacks**: Malicious data stored in cache
4. **Cross-Site Scripting**: XSS attacks accessing cache
5. **Storage Manipulation**: Direct manipulation of localStorage/IndexedDB

### Mitigation Strategies

1. **Encryption**: Encrypt sensitive data at rest
2. **Key Management**: Secure key generation and storage
3. **Input Validation**: Validate and sanitize all cached data
4. **Access Control**: Use namespaces to isolate data
5. **Monitoring**: Log and monitor cache operations
6. **Regular Audits**: Periodically review cache security

### Security Checklist

- [ ] Encryption enabled for sensitive data
- [ ] Strong, randomly generated keys used
- [ ] Keys stored securely (not in source code)
- [ ] Data classified by sensitivity
- [ ] Input validation implemented
- [ ] Namespaces used for data isolation
- [ ] Error handling doesn't expose sensitive information
- [ ] Regular security audits performed
- [ ] Monitoring and logging in place
- [ ] Key rotation procedures established

By following these security guidelines and best practices, you can ensure that CacheX provides secure caching for your application while protecting sensitive data from unauthorized access.