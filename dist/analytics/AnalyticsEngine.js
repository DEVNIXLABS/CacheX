"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AnalyticsEngine = /*#__PURE__*/function () {
  function AnalyticsEngine() {
    _classCallCheck(this, AnalyticsEngine);
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      memoryUsage: 0,
      persistentUsage: 0
    };
    this.entryStats = new Map();
  }
  return _createClass(AnalyticsEngine, [{
    key: "recordHit",
    value: function recordHit(key) {
      this.metrics.hits++;
      this._updateEntryStat(key, 'hits');
    }
  }, {
    key: "recordMiss",
    value: function recordMiss(key) {
      this.metrics.misses++;
      this._updateEntryStat(key, 'misses');
    }
  }, {
    key: "recordSet",
    value: function recordSet(key) {
      this.metrics.sets++;
      this._updateEntryStat(key, 'sets');
    }
  }, {
    key: "recordDelete",
    value: function recordDelete(key) {
      this.metrics.deletes++;
      this._updateEntryStat(key, 'deletes');
    }
  }, {
    key: "recordError",
    value: function recordError(key, errorType) {
      this.metrics.errors++;
      this._updateEntryStat(key, 'errors', errorType);
    }
  }, {
    key: "updateMemoryUsage",
    value: function updateMemoryUsage(usage) {
      this.metrics.memoryUsage = usage;
    }
  }, {
    key: "updatePersistentUsage",
    value: function updatePersistentUsage(usage) {
      this.metrics.persistentUsage = usage;
    }
  }, {
    key: "_updateEntryStat",
    value: function _updateEntryStat(key, statType) {
      var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!this.entryStats.has(key)) {
        this.entryStats.set(key, {
          hits: 0,
          misses: 0,
          sets: 0,
          deletes: 0,
          errors: 0,
          firstAccess: Date.now(),
          lastAccess: Date.now()
        });
      }
      var entryStat = this.entryStats.get(key);
      entryStat[statType]++;
      entryStat.lastAccess = Date.now();
      if (detail) {
        if (!entryStat.errorDetails) {
          entryStat.errorDetails = [];
        }
        entryStat.errorDetails.push({
          type: detail,
          timestamp: Date.now()
        });
      }
    }
  }, {
    key: "getHitRatio",
    value: function getHitRatio() {
      var total = this.metrics.hits + this.metrics.misses;
      return total > 0 ? this.metrics.hits / total : 0;
    }
  }, {
    key: "getMetrics",
    value: function getMetrics() {
      return _objectSpread(_objectSpread({}, this.metrics), {}, {
        hitRatio: this.getHitRatio()
      });
    }
  }, {
    key: "getEntryStats",
    value: function getEntryStats(key) {
      return this.entryStats.get(key) || null;
    }
  }, {
    key: "getAllEntryStats",
    value: function getAllEntryStats() {
      return new Map(this.entryStats);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.metrics = {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
        errors: 0,
        memoryUsage: 0,
        persistentUsage: 0
      };
      this.entryStats.clear();
    }
  }, {
    key: "getReport",
    value: function getReport() {
      var metrics = this.getMetrics();
      var totalAccesses = metrics.hits + metrics.misses;
      return "\nCacheX Analytics Report\n======================\n\nOverall Metrics:\n- Hits: ".concat(metrics.hits, "\n- Misses: ").concat(metrics.misses, "\n- Hit Ratio: ").concat((metrics.hitRatio * 100).toFixed(2), "%\n- Total Accesses: ").concat(totalAccesses, "\n- Sets: ").concat(metrics.sets, "\n- Deletes: ").concat(metrics.deletes, "\n- Errors: ").concat(metrics.errors, "\n\nResource Usage:\n- Memory Usage: ").concat(metrics.memoryUsage, " bytes\n- Persistent Storage Usage: ").concat(metrics.persistentUsage, " bytes\n    ").trim();
    }
  }]);
}();
var _default = exports["default"] = AnalyticsEngine;