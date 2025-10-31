# CacheX - The Hybrid Caching Engine for Modern JavaScript Apps

[![npm version](https://badge.fury.io/js/cachex.svg)](https://badge.fury.io/js/cachex)
[![Build Status](https://github.com/DevNixLabs/cachex/actions/workflows/ci.yml/badge.svg)](https://github.com/DevNixLabs/cachex/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DevNixLabs/cachex/blob/main/LICENSE)

## 🚀 Overview

CacheX is a high-performance, hybrid caching library built for the modern web. It combines in-memory speed with persistent local storage reliability, giving your app the best of both worlds — instant data access that survives page reloads and offline states.

CacheX = Speed + Persistence + Intelligence

## ⚙️ What It Does

CacheX automatically manages data across two layers:

1. **Memory Cache** — volatile, ultra-fast data layer (RAM)
2. **Persistent Cache** — stored in localStorage or IndexedDB, survives reloads or offline usage

When your app requests data:
- CacheX checks the in-memory layer first (fastest path)
- If not found, it pulls from persistent storage, auto-refreshes memory, and returns the result
- Optionally, it fetches new data in the background when entries expire

## 🧠 Core Features

- ⚡ **Hybrid Cache Architecture** - Combines memory and local storage automatically
- ⏳ **TTL and Expiry Management** - Built-in time-to-live system for every cache entry
- 🔄 **Smart Sync** - Automatically syncs in-memory cache with persistent layer
- 💾 **Persistence Control** - Store items temporarily or persist them across sessions
- 📊 **Cache Insights** - Tracks hit/miss ratio, size, and usage frequency
- 🧱 **Namespace Support** - Separate caches for modules like auth, user, ui, or config
- 🔒 **Secure Mode (Optional)** - AES encryption for sensitive cache entries

## 📦 Installation

```bash
npm install cachex
```

Or include directly in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/cachex@latest/dist/cachex.min.js"></script>
```

## 📖 Quick Start

```javascript
// Import CacheX
import CacheX from 'cachex';

// Initialize cache
const cache = new CacheX();

// Set cache entry with TTL
cache.set('userProfile', { name: 'John', age: 30 }, { ttl: 3600 });

// Get cache entry
const profile = cache.get('userProfile');

// Delete cache entry
cache.delete('userProfile');
```

## 🛠️ Configuration

```javascript
const cache = new CacheX({
  defaultTTL: 300,        // 5 minutes default TTL
  maxMemorySize: 1000,    // Max entries in memory
  persistence: 'localStorage', // Storage backend (localStorage or indexedDB)
  namespace: 'myapp',     // Default namespace
  encryption: false,      // Enable encryption
  syncPolicy: 'deferred'  // Sync strategy
});
```

## 🧪 API Reference

### Core Methods
- `get(key)` - Retrieve cached data
- `set(key, value, options)` - Store data with TTL, persistence flags
- `delete(key)` - Remove specific entry
- `clear()` - Clear all entries
- `has(key)` - Check if key exists
- `stats()` - Get cache performance statistics

### Advanced Methods
- `getOrSet(key, factoryFn, options)` - Get existing or create new entry
- `refresh(key)` - Force refresh of cached entry
- `keys()` - List all cache keys

### Namespaces
- `createNamespace(name)` - Create isolated cache namespace
- `useNamespace(name)` - Switch to specific namespace

## 🎯 Use Cases

| Scenario | CacheX Benefit |
|----------|----------------|
| Single Page Apps (SPAs) | Cache API calls and state between routes |
| Progressive Web Apps (PWAs) | Offline data access and sync |
| E-commerce Apps | Save cart, filters, and recommendations |
| Dashboards | Cache analytics data and charts |
| Chat / Social Apps | Keep recent messages and profiles |
| Crypto Trackers | Retain last known prices and charts even offline |
| AI Tools | Store AI responses, results, or embeddings temporarily |

## 📈 Performance

CacheX provides significant performance improvements:
- **Sub-millisecond** memory access times
- **Automatic** memory management with LRU eviction
- **Persistent** storage that survives page reloads
- **Smart** synchronization between layers

## 📚 Documentation

- [API Reference](docs/API.md)
- [Examples](docs/EXAMPLES.md)
- [Performance Guide](docs/PERFORMANCE.md)
- [Security Guide](docs/SECURITY.md)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Run example
npm run example
```

## 📄 License

MIT © DevNixLabs

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 🐛 Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/DevNixLabs/cachex/issues).