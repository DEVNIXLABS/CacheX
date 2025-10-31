"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Sync Engine
 * 
 * Coordinates synchronization between memory and persistent cache layers
 */
var SyncEngine = /*#__PURE__*/function () {
  /**
   * Creates a new SyncEngine instance
   * @param {Object} memoryCache - Memory cache instance
   * @param {Object} persistentCache - Persistent cache instance
   * @param {Object} options - Configuration options
   */
  function SyncEngine(memoryCache, persistentCache) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, SyncEngine);
    this.memoryCache = memoryCache;
    this.persistentCache = persistentCache;
    this.syncPolicy = options.syncPolicy || 'deferred'; // immediate, deferred, conditional
    this.batchSize = options.batchSize || 10;

    // For deferred syncing
    this.pendingWrites = new Map();
    this.syncTimer = null;
  }

  /**
   * Sync entry from persistent to memory cache
   * @param {string} key - Cache key
   * @returns {*} Value if found and synced, undefined otherwise
   */
  return _createClass(SyncEngine, [{
    key: "syncToMemory",
    value: function syncToMemory(key) {
      var value = this.persistentCache.get(key);
      if (value !== undefined) {
        // Get metadata from persistent storage
        // TODO: Extract metadata from persistent storage
        var metadata = {};
        this.memoryCache.set(key, value, metadata);
        return value;
      }
      return undefined;
    }

    /**
     * Sync entry from memory to persistent cache
     * @param {string} key - Cache key
     * @param {*} value - Value to sync
     * @param {Object} options - Sync options
     */
  }, {
    key: "syncToPersistent",
    value: function syncToPersistent(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      switch (this.syncPolicy) {
        case 'immediate':
          this._immediateSync(key, value, options);
          break;
        case 'deferred':
          this._deferredSync(key, value, options);
          break;
        case 'conditional':
          this._conditionalSync(key, value, options);
          break;
        default:
          this._deferredSync(key, value, options);
      }
    }

    /**
     * Immediate sync to persistent storage
     * @private
     * @param {string} key - Cache key
     * @param {*} value - Value to sync
     * @param {Object} options - Sync options
     */
  }, {
    key: "_immediateSync",
    value: function _immediateSync(key, value, options) {
      this.persistentCache.set(key, value, options);
    }

    /**
     * Deferred sync to persistent storage
     * @private
     * @param {string} key - Cache key
     * @param {*} value - Value to sync
     * @param {Object} options - Sync options
     */
  }, {
    key: "_deferredSync",
    value: function _deferredSync(key, value, options) {
      var _this = this;
      // Add to pending writes
      this.pendingWrites.set(key, {
        value: value,
        options: options
      });

      // Schedule sync if not already scheduled
      if (!this.syncTimer) {
        this.syncTimer = setTimeout(function () {
          _this._processPendingWrites();
        }, 100); // Small delay to batch writes
      }
    }

    /**
     * Conditional sync based on entry importance
     * @private
     * @param {string} key - Cache key
     * @param {*} value - Value to sync
     * @param {Object} options - Sync options
     */
  }, {
    key: "_conditionalSync",
    value: function _conditionalSync(key, value, options) {
      // Only sync if persistence is explicitly requested
      if (options.persist) {
        this._deferredSync(key, value, options);
      }
    }

    /**
     * Process pending writes in batches
     * @private
     */
  }, {
    key: "_processPendingWrites",
    value: function _processPendingWrites() {
      var _this2 = this;
      // Clear timer
      if (this.syncTimer) {
        clearTimeout(this.syncTimer);
        this.syncTimer = null;
      }

      // Process in batches
      var entries = Array.from(this.pendingWrites.entries());
      var batches = [];
      for (var i = 0; i < entries.length; i += this.batchSize) {
        batches.push(entries.slice(i, i + this.batchSize));
      }

      // Process each batch
      batches.forEach(function (batch) {
        batch.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            _ref2$ = _ref2[1],
            value = _ref2$.value,
            options = _ref2$.options;
          _this2.persistentCache.set(key, value, options);
        });
      });

      // Clear pending writes
      this.pendingWrites.clear();
    }

    /**
     * Load frequently accessed items into memory
     * @param {Array} keys - Keys to preload
     */
  }, {
    key: "preload",
    value: function preload(keys) {
      var _this3 = this;
      keys.forEach(function (key) {
        if (_this3.persistentCache.has(key) && !_this3.memoryCache.has(key)) {
          _this3.syncToMemory(key);
        }
      });
    }

    /**
     * Clear sync state
     */
  }, {
    key: "clear",
    value: function clear() {
      if (this.syncTimer) {
        clearTimeout(this.syncTimer);
        this.syncTimer = null;
      }
      this.pendingWrites.clear();
    }
  }]);
}();
var _default = exports["default"] = SyncEngine;