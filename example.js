const { CacheX } = require('./src/index.js');

const cache = new CacheX({
  defaultTTL: 60,
  maxMemorySize: 500,
  persistence: 'localStorage',
  namespace: 'myapp'
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
console.log(cache.stats());

console.log('Creating namespace...');
const authCache = cache.createNamespace('auth');
authCache.set('session', { userId: 123, roles: ['user', 'admin'] });

console.log('Getting from auth namespace...');
const session = authCache.get('session');
console.log('Retrieved session:', session);

console.log('CacheX example completed!');