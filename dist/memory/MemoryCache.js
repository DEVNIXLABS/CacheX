"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MemoryCache = /*#__PURE__*/function () {
  function MemoryCache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MemoryCache);
    this.maxSize = options.maxSize || 1000;
    this.cache = new Map();
    this.accessOrder = new Set();
  }
  return _createClass(MemoryCache, [{
    key: "get",
    value: function get(key) {
      if (this.cache.has(key)) {
        var entry = this.cache.get(key);
        this.accessOrder["delete"](key);
        this.accessOrder.add(key);
        return entry.value;
      }
      return undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (this.cache.size >= this.maxSize) {
        this._evictLRU();
      }
      this.cache.set(key, _objectSpread(_objectSpread({
        value: value
      }, metadata), {}, {
        lastAccessed: Date.now()
      }));
      this.accessOrder["delete"](key);
      this.accessOrder.add(key);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.cache["delete"](key);
      this.accessOrder["delete"](key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.cache.clear();
      this.accessOrder.clear();
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.cache.has(key);
    }
  }, {
    key: "keys",
    value: function keys() {
      return Array.from(this.cache.keys());
    }
  }, {
    key: "_evictLRU",
    value: function _evictLRU() {
      var firstKey = this.accessOrder.values().next().value;
      if (firstKey) {
        this["delete"](firstKey);
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.cache.size;
    }
  }]);
}();
module.exports = MemoryCache;