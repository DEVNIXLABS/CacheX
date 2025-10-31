"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MemoryCache = _interopRequireDefault(require("../memory/MemoryCache.js"));
var _PersistentCache = _interopRequireDefault(require("../persistent/PersistentCache.js"));
var _TTLManager = _interopRequireDefault(require("../ttl/TTLManager.js"));
var _SyncEngine = _interopRequireDefault(require("../sync/SyncEngine.js"));
var _NamespaceManager = _interopRequireDefault(require("../namespace/NamespaceManager.js"));
var _AnalyticsEngine = _interopRequireDefault(require("../analytics/AnalyticsEngine.js"));
var _SecurityModule = _interopRequireDefault(require("../security/SecurityModule.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CacheX = /*#__PURE__*/function () {
  function CacheX() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CacheX);
    this.options = _objectSpread({
      defaultTTL: options.defaultTTL || 300,
      maxMemorySize: options.maxMemorySize || 1000,
      persistence: options.persistence || 'localStorage',
      namespace: options.namespace || 'default',
      encryption: options.encryption || false,
      encryptionKey: options.encryptionKey || null
    }, options);
    this._initComponents();
  }
  return _createClass(CacheX, [{
    key: "_initComponents",
    value: function _initComponents() {
      this.memoryCache = new _MemoryCache["default"]({
        maxSize: this.options.maxMemorySize
      });
      this.persistentCache = new _PersistentCache["default"]({
        storageType: this.options.persistence,
        namespace: this.options.namespace
      });
      this.ttlManager = new _TTLManager["default"]({
        defaultTTL: this.options.defaultTTL
      });
      this.analytics = new _AnalyticsEngine["default"]();
      this.security = new _SecurityModule["default"]({
        enabled: this.options.encryption,
        encryptionKey: this.options.encryptionKey
      });
      this.syncEngine = new _SyncEngine["default"](this.memoryCache, this.persistentCache, {
        syncPolicy: this.options.syncPolicy || 'deferred'
      });
      this.namespaceManager = new _NamespaceManager["default"](this);
    }
  }, {
    key: "get",
    value: function get(key) {
      var value = this.memoryCache.get(key);
      if (value !== undefined) {
        this.analytics.recordHit(key);
        return this.security.decrypt(value);
      }
      value = this.persistentCache.get(key);
      if (value !== undefined) {
        if (this.ttlManager.isExpired(key)) {
          this["delete"](key);
          this.analytics.recordMiss(key);
          return undefined;
        }
        this.analytics.recordHit(key);
        value = this.security.decrypt(value);
        this.memoryCache.set(key, value);
        return value;
      }
      this.analytics.recordMiss(key);
      return undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var opts = _objectSpread({
        ttl: this.options.defaultTTL,
        persist: true,
        encrypt: this.options.encryption
      }, options);
      var processedValue = opts.encrypt ? this.security.encrypt(value) : value;
      this.memoryCache.set(key, processedValue, {
        ttl: opts.ttl
      });
      if (opts.ttl) {
        this.ttlManager.setTTL(key, opts.ttl, function () {
          _this["delete"](key);
        });
      }
      if (opts.persist) {
        this.syncEngine.syncToPersistent(key, processedValue, {
          ttl: opts.ttl,
          persist: opts.persist
        });
      }
      this.analytics.recordSet(key);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.memoryCache["delete"](key);
      this.persistentCache["delete"](key);
      this.ttlManager.removeTTL(key);
      this.analytics.recordDelete(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.memoryCache.clear();
      this.persistentCache.clear();
      this.ttlManager.clear();
      this.syncEngine.clear();
      this.analytics.reset();
    }
  }, {
    key: "has",
    value: function has(key) {
      if (this.memoryCache.has(key)) {
        return !this.ttlManager.isExpired(key);
      }
      if (this.persistentCache.has(key)) {
        return !this.ttlManager.isExpired(key);
      }
      return false;
    }
  }, {
    key: "stats",
    value: function stats() {
      return {
        memory: {
          size: this.memoryCache.size(),
          maxSize: this.options.maxMemorySize
        },
        persistent: {
          size: this.persistentCache.keys().length
        },
        ttl: {
          trackedEntries: this.ttlManager.expiryCallbacks.size
        },
        analytics: this.analytics.getMetrics()
      };
    }
  }, {
    key: "createNamespace",
    value: function createNamespace(name) {
      return this.namespaceManager.createNamespace(name);
    }
  }, {
    key: "useNamespace",
    value: function useNamespace(name) {
      return this.namespaceManager.useNamespace(name);
    }
  }]);
}();
var _default = exports["default"] = CacheX;