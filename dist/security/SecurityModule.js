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
var SecurityModule = /*#__PURE__*/function () {
  function SecurityModule() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SecurityModule);
    this.isEnabled = options.enabled || false;
    this.encryptionKey = options.encryptionKey || null;
    this.algorithm = options.algorithm || 'AES';

    // Warn about simple XOR encryption not being production-ready
    if (this.isEnabled && this.algorithm === 'XOR') {
      console.warn('WARNING: Simple XOR encryption is NOT secure and should NOT be used in production. Please implement proper encryption.');
    }
  }
  return _createClass(SecurityModule, [{
    key: "encrypt",
    value: function encrypt(data) {
      if (!this.isEnabled || !this.encryptionKey) {
        return data;
      }
      try {
        var dataStr = typeof data === 'string' ? data : JSON.stringify(data);

        // Show warning for simple XOR encryption
        if (this.algorithm === 'XOR') {
          console.warn('Using insecure XOR encryption. This is for demonstration purposes only.');
        }

        // TODO: Implement actual encryption
        // This is a placeholder - in real implementation, we would use
        // Web Crypto API or a library like CryptoJS
        var encrypted = this._simpleXOR(dataStr, this.encryptionKey);
        return encrypted;
      } catch (e) {
        console.warn('Encryption failed:', e.message);
        return data;
      }
    }
  }, {
    key: "decrypt",
    value: function decrypt(encryptedData) {
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
        var decrypted = this._simpleXOR(encryptedData, this.encryptionKey);

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
  }, {
    key: "generateKey",
    value: function generateKey() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      if (typeof window !== 'undefined' && window.crypto) {
        var array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, function (_byte) {
          return String.fromCharCode(_byte);
        }).join('');
      } else {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }
    }
  }, {
    key: "enable",
    value: function enable(key) {
      this.isEnabled = true;
      this.encryptionKey = key;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.isEnabled = false;
      this.encryptionKey = null;
    }

    // Method to set a proper encryption algorithm
  }, {
    key: "setAlgorithm",
    value: function setAlgorithm(algorithm) {
      if (algorithm !== 'AES' && algorithm !== 'XOR') {
        console.warn('Unsupported algorithm. Supported algorithms: AES, XOR');
        return;
      }
      this.algorithm = algorithm;
      if (algorithm === 'XOR') {
        console.warn('WARNING: XOR encryption is NOT secure and should NOT be used in production.');
      }
    }
  }]);
}();
var _default = exports["default"] = SecurityModule;