class NamespaceManager {
  constructor(cacheX) {
    this.cacheX = cacheX;
    this.namespaces = new Map();
    this.currentNamespace = 'default';
  }
  
  createNamespace(name) {
    if (this.namespaces.has(name)) {
      return this.namespaces.get(name);
    }
    
    // Create new CacheX instance for namespace with isolated configuration
    const namespaceInstance = new this.cacheX.constructor({
      ...this.cacheX.options,
      namespace: name
    });
    
    this.namespaces.set(name, namespaceInstance);
    return namespaceInstance;
  }
  
  useNamespace(name) {
    if (!this.namespaces.has(name)) {
      this.createNamespace(name);
    }
    
    this.currentNamespace = name;
    return this.namespaces.get(name);
  }
  
  getCurrentNamespace() {
    return this.namespaces.get(this.currentNamespace) || this.cacheX;
  }
  
  deleteNamespace(name) {
    if (this.namespaces.has(name)) {
      const namespace = this.namespaces.get(name);
      namespace.clear();
      this.namespaces.delete(name);
    }
    
    if (this.currentNamespace === name) {
      this.currentNamespace = 'default';
    }
  }
  
  listNamespaces() {
    return Array.from(this.namespaces.keys());
  }
  
  clearAll() {
    for (const namespace of this.namespaces.values()) {
      namespace.clear();
    }
    
    this.namespaces.clear();
    this.currentNamespace = 'default';
  }
}

export default NamespaceManager;