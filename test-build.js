const { CacheX } = require('./dist/index.js');

const cache = new CacheX({
  defaultTTL: 60,
  maxMemorySize: 500,
  namespace: 'test'
});

console.log('Setting cache entry...');
cache.set('userProfile', { name: 'John Doe', age: 30, email: 'john@example.com' });

console.log('Getting cache entry...');
const profile = cache.get('userProfile');
console.log('Retrieved profile:', profile);

console.log('Setting cache entry with custom TTL...');
cache.set('tempToken', 'abc123xyz', { ttl: 30 });

console.log('Getting temp token...');
const token = cache.get('tempToken');
console.log('Retrieved token:', token);

console.log('Cache statistics:');
console.log(JSON.stringify(cache.stats(), null, 2));

console.log('CacheX build test completed successfully!');