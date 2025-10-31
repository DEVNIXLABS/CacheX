"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Security Module
 * 
 * Provides encryption for sensitive cache entries
 */
var SecurityModule = /*#__PURE__*/function () {
  /**
   * Creates a new SecurityModule instance
   * @param {Object} options - Configuration options
   */
  function SecurityModule() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SecurityModule);
    this.isEnabled = options.enabled || false;
    this.encryptionKey = options.encryptionKey || null;
    this.algorithm = options.algorithm || 'AES';
  }

  /**
   * Encrypt data
   * @param {*} data - Data to encrypt
   * @returns {string} Encrypted data
   */
  return _createClass(SecurityModule, [{
    key: "encrypt",
    value: function encrypt(data) {
      if (!this.isEnabled || !this.encryptionKey) {
        return data;
      }
      try {
        // Convert data to string if needed
        var dataStr = typeof data === 'string' ? data : JSON.stringify(data);

        // TODO: Implement actual encryption
        // This is a placeholder - in real implementation, we would use
        // Web Crypto API or a library like CryptoJS
        var encrypted = this._simpleXOR(dataStr, this.encryptionKey);
        return encrypted;
      } catch (e) {
        console.warn('Encryption failed:', e);
        return data; // Return unencrypted data on failure
      }
    }

    /**
     * Decrypt data
     * @param {string} encryptedData - Encrypted data
     * @returns {*} Decrypted data
     */
  }, {
    key: "decrypt",
    value: function decrypt(encryptedData) {
      if (!this.isEnabled || !this.encryptionKey) {
        return encryptedData;
      }
      try {
        // TODO: Implement actual decryption
        // This is a placeholder - in real implementation, we would use
        // Web Crypto API or a library like CryptoJS
        var decrypted = this._simpleXOR(encryptedData, this.encryptionKey);

        // Try to parse as JSON if it looks like JSON
        try {
          return JSON.parse(decrypted);
        } catch (e) {
          return decrypted;
        }
      } catch (e) {
        console.warn('Decryption failed:', e);
        return encryptedData; // Return encrypted data on failure
      }
    }

    /**
     * Simple XOR encryption (NOT for production use)
     * @private
     * @param {string} data - Data to encrypt
     * @param {string} key - Encryption key
     * @returns {string} "Encrypted" data
     */
  }, {
    key: "_simpleXOR",
    value: function _simpleXOR(data, key) {
      // This is NOT secure encryption - just for demonstration
      // A real implementation would use proper encryption algorithms
      var keyChars = key.split('').map(function (c) {
        return c.charCodeAt(0);
      });
      return data.split('').map(function (_char, i) {
        return String.fromCharCode(_char.charCodeAt(0) ^ keyChars[i % keyChars.length]);
      }).join('');
    }

    /**
     * Generate a secure encryption key
     * @param {number} length - Key length in bytes
     * @returns {string} Generated key
     */
  }, {
    key: "generateKey",
    value: function generateKey() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      if (typeof window !== 'undefined' && window.crypto) {
        // Use Web Crypto API if available
        var array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, function (_byte) {
          return String.fromCharCode(_byte);
        }).join('');
      } else {
        // Fallback for Node.js or older browsers
        // NOT cryptographically secure - just for demonstration
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }
    }

    /**
     * Enable encryption
     * @param {string} key - Encryption key
     */
  }, {
    key: "enable",
    value: function enable(key) {
      this.isEnabled = true;
      this.encryptionKey = key;
    }

    /**
     * Disable encryption
     */
  }, {
    key: "disable",
    value: function disable() {
      this.isEnabled = false;
      this.encryptionKey = null;
    }
  }]);
}();
var _default = exports["default"] = SecurityModule;