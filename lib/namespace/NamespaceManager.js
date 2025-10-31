"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Namespace Manager
 * 
 * Manages isolated cache namespaces
 */
var NamespaceManager = /*#__PURE__*/function () {
  /**
   * Creates a new NamespaceManager instance
   * @param {Object} cacheX - Main CacheX instance
   */
  function NamespaceManager(cacheX) {
    _classCallCheck(this, NamespaceManager);
    this.cacheX = cacheX;
    this.namespaces = new Map();
    this.currentNamespace = 'default';
  }

  /**
   * Create a new namespace
   * @param {string} name - Namespace name
   * @returns {Object} New namespace instance
   */
  return _createClass(NamespaceManager, [{
    key: "createNamespace",
    value: function createNamespace(name) {
      if (this.namespaces.has(name)) {
        return this.namespaces.get(name);
      }

      // Create new CacheX instance for namespace
      var namespaceInstance = new this.cacheX.constructor(_objectSpread(_objectSpread({}, this.cacheX.options), {}, {
        namespace: name
      }));
      this.namespaces.set(name, namespaceInstance);
      return namespaceInstance;
    }

    /**
     * Switch to a specific namespace
     * @param {string} name - Namespace name
     * @returns {Object} Namespace instance
     */
  }, {
    key: "useNamespace",
    value: function useNamespace(name) {
      if (!this.namespaces.has(name)) {
        this.createNamespace(name);
      }
      this.currentNamespace = name;
      return this.namespaces.get(name);
    }

    /**
     * Get current namespace instance
     * @returns {Object} Current namespace instance
     */
  }, {
    key: "getCurrentNamespace",
    value: function getCurrentNamespace() {
      return this.namespaces.get(this.currentNamespace) || this.cacheX;
    }

    /**
     * Delete a namespace
     * @param {string} name - Namespace name
     */
  }, {
    key: "deleteNamespace",
    value: function deleteNamespace(name) {
      if (this.namespaces.has(name)) {
        var namespace = this.namespaces.get(name);
        namespace.clear();
        this.namespaces["delete"](name);
      }

      // Reset to default if we deleted the current namespace
      if (this.currentNamespace === name) {
        this.currentNamespace = 'default';
      }
    }

    /**
     * List all namespaces
     * @returns {Array} Array of namespace names
     */
  }, {
    key: "listNamespaces",
    value: function listNamespaces() {
      return Array.from(this.namespaces.keys());
    }

    /**
     * Clear all namespaces
     */
  }, {
    key: "clearAll",
    value: function clearAll() {
      var _iterator = _createForOfIteratorHelper(this.namespaces.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var namespace = _step.value;
          namespace.clear();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.namespaces.clear();
      this.currentNamespace = 'default';
    }
  }]);
}();
var _default = exports["default"] = NamespaceManager;