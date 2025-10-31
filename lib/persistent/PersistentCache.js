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
 * Persistent Cache Implementation
 * 
 * Storage adapter for localStorage and IndexedDB
 */
var PersistentCache = /*#__PURE__*/function () {
  /**
   * Creates a new PersistentCache instance
   * @param {Object} options - Configuration options
   */
  function PersistentCache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PersistentCache);
    this.storageType = options.storageType || 'localStorage';
    this.namespace = options.namespace || 'cachex';
    this.compression = options.compression || false;

    // Check if storage is available
    this.isAvailable = this._checkStorageAvailability();
  }

  /**
   * Check if storage mechanism is available
   * @private
   * @returns {boolean} True if storage is available
   */
  return _createClass(PersistentCache, [{
    key: "_checkStorageAvailability",
    value: function _checkStorageAvailability() {
      if (typeof window === 'undefined') {
        return false;
      }
      try {
        if (this.storageType === 'localStorage' && window.localStorage) {
          var testKey = '__cachex_storage_test__';
          window.localStorage.setItem(testKey, testKey);
          window.localStorage.removeItem(testKey);
          return true;
        }

        // TODO: Add IndexedDB availability check
        return false;
      } catch (e) {
        return false;
      }
    }

    /**
     * Get a value from persistent cache
     * @param {string} key - Cache key
     * @returns {*} Cached value or undefined
     */
  }, {
    key: "get",
    value: function get(key) {
      if (!this.isAvailable) {
        return undefined;
      }
      try {
        var fullKey = this._getFullKey(key);
        var itemStr = window.localStorage.getItem(fullKey);
        if (!itemStr) {
          return undefined;
        }
        var item = JSON.parse(itemStr);

        // Check if item has expired
        if (item.expires && Date.now() > item.expires) {
          this["delete"](key);
          return undefined;
        }

        // Decompress if needed
        var value = this.compression ? this._decompress(item.value) : item.value;
        return value;
      } catch (e) {
        console.warn('Error reading from persistent cache:', e);
        return undefined;
      }
    }

    /**
     * Set a value in persistent cache
     * @param {string} key - Cache key
     * @param {*} value - Value to cache
     * @param {Object} options - Cache options
     */
  }, {
    key: "set",
    value: function set(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.isAvailable) {
        return;
      }
      try {
        var fullKey = this._getFullKey(key);

        // Compress if needed
        var storedValue = this.compression ? this._compress(value) : value;
        var item = {
          value: storedValue,
          createdAt: Date.now(),
          expires: options.ttl ? Date.now() + options.ttl * 1000 : null
        };
        window.localStorage.setItem(fullKey, JSON.stringify(item));
      } catch (e) {
        console.warn('Error writing to persistent cache:', e);
      }
    }

    /**
     * Delete a cache entry
     * @param {string} key - Cache key to delete
     */
  }, {
    key: "delete",
    value: function _delete(key) {
      if (!this.isAvailable) {
        return;
      }
      try {
        var fullKey = this._getFullKey(key);
        window.localStorage.removeItem(fullKey);
      } catch (e) {
        console.warn('Error deleting from persistent cache:', e);
      }
    }

    /**
     * Clear all cache entries
     */
  }, {
    key: "clear",
    value: function clear() {
      var _this = this;
      if (!this.isAvailable) {
        return;
      }
      try {
        Object.keys(window.localStorage).forEach(function (key) {
          if (key.startsWith("".concat(_this.namespace, ":"))) {
            window.localStorage.removeItem(key);
          }
        });
      } catch (e) {
        console.warn('Error clearing persistent cache:', e);
      }
    }

    /**
     * Check if key exists in cache
     * @param {string} key - Cache key
     * @returns {boolean} True if key exists
     */
  }, {
    key: "has",
    value: function has(key) {
      if (!this.isAvailable) {
        return false;
      }
      try {
        var fullKey = this._getFullKey(key);
        return window.localStorage.getItem(fullKey) !== null;
      } catch (e) {
        return false;
      }
    }

    /**
     * Get all cache keys
     * @returns {Array} Array of cache keys
     */
  }, {
    key: "keys",
    value: function keys() {
      if (!this.isAvailable) {
        return [];
      }
      try {
        var prefix = "".concat(this.namespace, ":");
        return Object.keys(window.localStorage).filter(function (key) {
          return key.startsWith(prefix);
        }).map(function (key) {
          return key.substring(prefix.length);
        });
      } catch (e) {
        return [];
      }
    }

    /**
     * Get full key with namespace
     * @private
     * @param {string} key - Cache key
     * @returns {string} Full key with namespace
     */
  }, {
    key: "_getFullKey",
    value: function _getFullKey(key) {
      return "".concat(this.namespace, ":").concat(key);
    }

    /**
     * Compress value for storage
     * @private
     * @param {*} value - Value to compress
     * @returns {*} Compressed value
     */
  }, {
    key: "_compress",
    value: function _compress(value) {
      // TODO: Implement compression logic
      return value;
    }

    /**
     * Decompress value from storage
     * @private
     * @param {*} value - Value to decompress
     * @returns {*} Decompressed value
     */
  }, {
    key: "_decompress",
    value: function _decompress(value) {
      // TODO: Implement decompression logic
      return value;
    }
  }]);
}();
var _default = exports["default"] = PersistentCache;