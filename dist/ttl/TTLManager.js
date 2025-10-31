"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TTLManager = /*#__PURE__*/function () {
  function TTLManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TTLManager);
    this.defaultTTL = options.defaultTTL || 300;
    this.cleanupInterval = options.cleanupInterval || 60000;
    this.expiryCallbacks = new Map();
    this.cleanupTimer = null;
    this._startCleanupTimer();
  }
  return _createClass(TTLManager, [{
    key: "setTTL",
    value: function setTTL(key, ttl, callback) {
      var expiresAt = Date.now() + ttl * 1000;
      this.expiryCallbacks.set(key, {
        expiresAt: expiresAt,
        callback: callback
      });
    }
  }, {
    key: "isExpired",
    value: function isExpired(key) {
      var expiryInfo = this.expiryCallbacks.get(key);
      if (!expiryInfo) {
        return false;
      }
      return Date.now() > expiryInfo.expiresAt;
    }
  }, {
    key: "getRemainingTTL",
    value: function getRemainingTTL(key) {
      var expiryInfo = this.expiryCallbacks.get(key);
      if (!expiryInfo) {
        return null;
      }
      var remaining = expiryInfo.expiresAt - Date.now();
      return Math.max(0, Math.floor(remaining / 1000));
    }
  }, {
    key: "removeTTL",
    value: function removeTTL(key) {
      this.expiryCallbacks["delete"](key);

      // Stop cleanup timer if no entries left
      if (this.expiryCallbacks.size === 0 && this.cleanupTimer) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.expiryCallbacks.clear();

      // Stop cleanup timer when clearing all entries
      if (this.cleanupTimer) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
    }
  }, {
    key: "_startCleanupTimer",
    value: function _startCleanupTimer() {
      var _this = this;
      // Only start timer if it's not already running
      if (!this.cleanupTimer) {
        this.cleanupTimer = setInterval(function () {
          _this._cleanupExpiredEntries();
        }, this.cleanupInterval);
      }
    }
  }, {
    key: "_cleanupExpiredEntries",
    value: function _cleanupExpiredEntries() {
      var _this2 = this;
      // Don't run cleanup if no entries to check
      if (this.expiryCallbacks.size === 0) {
        if (this.cleanupTimer) {
          clearInterval(this.cleanupTimer);
          this.cleanupTimer = null;
        }
        return;
      }
      var now = Date.now();
      var expiredKeys = [];
      var _iterator = _createForOfIteratorHelper(this.expiryCallbacks.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            expiryInfo = _step$value[1];
          if (now > expiryInfo.expiresAt) {
            expiredKeys.push({
              key: key,
              callback: expiryInfo.callback
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      expiredKeys.forEach(function (_ref) {
        var key = _ref.key,
          callback = _ref.callback;
        _this2.expiryCallbacks["delete"](key);
        if (typeof callback === 'function') {
          try {
            callback(key);
          } catch (e) {
            console.warn('Error in TTL expiry callback:', e);
          }
        }
      });
    }
  }, {
    key: "extendTTL",
    value: function extendTTL(key, ttl) {
      var expiryInfo = this.expiryCallbacks.get(key);
      if (expiryInfo) {
        expiryInfo.expiresAt = Date.now() + ttl * 1000;
      }
    }
  }]);
}();
var _default = exports["default"] = TTLManager;