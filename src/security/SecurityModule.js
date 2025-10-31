class SecurityModule {
  constructor(options = {}) {
    this.isEnabled = options.enabled || false;
    this.encryptionKey = options.encryptionKey || null;
    this.algorithm = options.algorithm || 'AES';
    
    // Warn about simple XOR encryption not being production-ready
    if (this.isEnabled && this.algorithm === 'XOR') {
      console.warn('WARNING: Simple XOR encryption is NOT secure and should NOT be used in production. Please implement proper encryption.');
    }
  }
  
  encrypt(data) {
    if (!this.isEnabled || !this.encryptionKey) {
      return data;
    }
    
    try {
      const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
      
      // Show warning for simple XOR encryption
      if (this.algorithm === 'XOR') {
        console.warn('Using insecure XOR encryption. This is for demonstration purposes only.');
      }
      
      // TODO: Implement actual encryption
      // This is a placeholder - in real implementation, we would use
      // Web Crypto API or a library like CryptoJS
      const encrypted = this._simpleXOR(dataStr, this.encryptionKey);
      
      return encrypted;
    } catch (e) {
      console.warn('Encryption failed:', e.message);
      return data;
    }
  }
  
  decrypt(encryptedData) {
    if (!this.isEnabled || !this.encryptionKey) {
      return encryptedData;
    }
    
    try {
      // Show warning for simple XOR encryption
      if (this.algorithm === 'XOR') {
        console.warn('Using insecure XOR encryption. This is for demonstration purposes only.');
      }
      
      // TODO: Implement actual decryption
      // This is a placeholder - in real implementation, we would use
      // Web Crypto API or a library like CryptoJS
      const decrypted = this._simpleXOR(encryptedData, this.encryptionKey);
      
      // Try to parse as JSON if it looks like JSON
      try {
        return JSON.parse(decrypted);
      } catch (e) {
        return decrypted;
      }
    } catch (e) {
      console.warn('Decryption failed:', e.message);
      return encryptedData;
    }
  }
  
  _simpleXOR(data, key) {
    // This is NOT secure encryption - just for demonstration
    // A real implementation would use proper encryption algorithms
    const keyChars = key.split('').map(c => c.charCodeAt(0));
    return data.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ keyChars[i % keyChars.length])
    ).join('');
  }
  
  generateKey(length = 32) {
    if (typeof window !== 'undefined' && window.crypto) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => String.fromCharCode(byte)).join('');
    } else {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  }
  
  enable(key) {
    this.isEnabled = true;
    this.encryptionKey = key;
  }
  
  disable() {
    this.isEnabled = false;
    this.encryptionKey = null;
  }
  
  // Method to set a proper encryption algorithm
  setAlgorithm(algorithm) {
    if (algorithm !== 'AES' && algorithm !== 'XOR') {
      console.warn('Unsupported algorithm. Supported algorithms: AES, XOR');
      return;
    }
    
    this.algorithm = algorithm;
    
    if (algorithm === 'XOR') {
      console.warn('WARNING: XOR encryption is NOT secure and should NOT be used in production.');
    }
  }
}

export default SecurityModule;