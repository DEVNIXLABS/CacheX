"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PersistentCache = /*#__PURE__*/function () {
  function PersistentCache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PersistentCache);
    this.storageType = options.storageType || 'localStorage';
    this.namespace = options.namespace || 'cachex';
    this.compression = options.compression || false;
    this.dbName = options.dbName || 'CacheXDB';
    this.dbVersion = options.dbVersion || 1;
    this.db = null;

    // Check if storage is available
    this.isAvailable = this._checkStorageAvailability();
  }
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

        // Check IndexedDB availability
        if (this.storageType === 'indexedDB' && typeof window.indexedDB !== 'undefined') {
          return true;
        }
        return false;
      } catch (e) {
        console.warn('Storage not available:', e.message);
        return false;
      }
    }
  }, {
    key: "_initIndexedDB",
    value: function () {
      var _initIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!this.isAvailable || this.storageType !== 'indexedDB')) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              return _context.a(2, new Promise(function (resolve, reject) {
                var request = window.indexedDB.open(_this.dbName, _this.dbVersion);
                request.onerror = function (event) {
                  console.warn('Error opening IndexedDB:', event.target.error);
                  reject(event.target.error);
                };
                request.onsuccess = function (event) {
                  _this.db = event.target.result;
                  resolve(_this.db);
                };
                request.onupgradeneeded = function (event) {
                  _this.db = event.target.result;
                  if (!_this.db.objectStoreNames.contains('cache')) {
                    var objectStore = _this.db.createObjectStore('cache', {
                      keyPath: 'key'
                    });
                    objectStore.createIndex('namespace', 'namespace', {
                      unique: false
                    });
                    objectStore.createIndex('expires', 'expires', {
                      unique: false
                    });
                  }
                };
              }));
          }
        }, _callee, this);
      }));
      function _initIndexedDB() {
        return _initIndexedDB2.apply(this, arguments);
      }
      return _initIndexedDB;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key) {
        var _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (this.isAvailable) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, undefined);
            case 1:
              _context2.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, this._getFromLocalStorage(key));
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context2.n = 4;
                break;
              }
              _context2.n = 3;
              return this._getFromIndexedDB(key);
            case 3:
              return _context2.a(2, _context2.v);
            case 4:
              _context2.n = 6;
              break;
            case 5:
              _context2.p = 5;
              _t = _context2.v;
              console.warn('Error reading from persistent cache:', _t.message);
              return _context2.a(2, undefined);
            case 6:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 5]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "_getFromLocalStorage",
    value: function _getFromLocalStorage(key) {
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
    }
  }, {
    key: "_getFromIndexedDB",
    value: function () {
      var _getFromIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key) {
        var _this2 = this;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this.db) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return this._initIndexedDB();
            case 1:
              return _context3.a(2, new Promise(function (resolve, reject) {
                var transaction = _this2.db.transaction(['cache'], 'readonly');
                var objectStore = transaction.objectStore('cache');
                var request = objectStore.get(_this2._getFullKey(key));
                request.onsuccess = function (event) {
                  var result = event.target.result;
                  if (!result) {
                    resolve(undefined);
                    return;
                  }

                  // Check if item has expired
                  if (result.expires && Date.now() > result.expires) {
                    _this2["delete"](key);
                    resolve(undefined);
                    return;
                  }

                  // Decompress if needed
                  var value = _this2.compression ? _this2._decompress(result.value) : result.value;
                  resolve(value);
                };
                request.onerror = function (event) {
                  console.warn('Error reading from IndexedDB:', event.target.error);
                  resolve(undefined);
                };
              }));
          }
        }, _callee3, this);
      }));
      function _getFromIndexedDB(_x2) {
        return _getFromIndexedDB2.apply(this, arguments);
      }
      return _getFromIndexedDB;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key, value) {
        var options,
          _args4 = arguments,
          _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              if (this.isAvailable) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context4.n = 2;
                break;
              }
              this._setToLocalStorage(key, value, options);
              _context4.n = 3;
              break;
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context4.n = 3;
                break;
              }
              _context4.n = 3;
              return this._setToIndexedDB(key, value, options);
            case 3:
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t2 = _context4.v;
              if (_t2.name === 'QuotaExceededError' || _t2.code === 22 || _t2.code === 1014) {
                console.warn('Storage quota exceeded. Clearing cache to make space.');
                this._handleQuotaExceeded();
              } else {
                console.warn('Error writing to persistent cache:', _t2.message);
              }
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4]]);
      }));
      function set(_x3, _x4) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "_setToLocalStorage",
    value: function _setToLocalStorage(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var fullKey = this._getFullKey(key);

      // Compress if needed
      var storedValue = this.compression ? this._compress(value) : value;
      var item = {
        value: storedValue,
        createdAt: Date.now(),
        expires: options.ttl ? Date.now() + options.ttl * 1000 : null
      };
      window.localStorage.setItem(fullKey, JSON.stringify(item));
    }
  }, {
    key: "_setToIndexedDB",
    value: function () {
      var _setToIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key, value) {
        var _this3 = this;
        var options,
          storedValue,
          item,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              if (this.db) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this._initIndexedDB();
            case 1:
              // Compress if needed
              storedValue = this.compression ? this._compress(value) : value;
              item = {
                key: this._getFullKey(key),
                value: storedValue,
                namespace: this.namespace,
                createdAt: Date.now(),
                expires: options.ttl ? Date.now() + options.ttl * 1000 : null
              };
              return _context5.a(2, new Promise(function (resolve, reject) {
                var transaction = _this3.db.transaction(['cache'], 'readwrite');
                var objectStore = transaction.objectStore('cache');
                var request = objectStore.put(item);
                request.onsuccess = function () {
                  resolve();
                };
                request.onerror = function (event) {
                  console.warn('Error writing to IndexedDB:', event.target.error);
                  reject(event.target.error);
                };
              }));
          }
        }, _callee5, this);
      }));
      function _setToIndexedDB(_x5, _x6) {
        return _setToIndexedDB2.apply(this, arguments);
      }
      return _setToIndexedDB;
    }()
  }, {
    key: "_handleQuotaExceeded",
    value: function _handleQuotaExceeded() {
      try {
        // Try to clear expired entries first
        this._clearExpiredEntries();

        // If still not enough space, clear all entries
        if (this._isQuotaStillExceeded()) {
          console.warn('Clearing all cache entries due to storage quota exceeded');
          this.clear();
        }
      } catch (e) {
        console.error('Error handling quota exceeded:', e.message);
      }
    }
  }, {
    key: "_clearExpiredEntries",
    value: function _clearExpiredEntries() {
      var _this4 = this;
      try {
        var now = Date.now();
        Object.keys(window.localStorage).forEach(function (key) {
          if (key.startsWith("".concat(_this4.namespace, ":"))) {
            try {
              var itemStr = window.localStorage.getItem(key);
              if (itemStr) {
                var item = JSON.parse(itemStr);
                if (item.expires && now > item.expires) {
                  window.localStorage.removeItem(key);
                }
              }
            } catch (e) {
              // Remove corrupted entries
              window.localStorage.removeItem(key);
            }
          }
        });
      } catch (e) {
        console.warn('Error clearing expired entries:', e.message);
      }
    }
  }, {
    key: "_isQuotaStillExceeded",
    value: function _isQuotaStillExceeded() {
      try {
        var testKey = '__cachex_quota_test__';
        window.localStorage.setItem(testKey, 'test');
        window.localStorage.removeItem(testKey);
        return false;
      } catch (e) {
        return true;
      }
    }
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(key) {
        var fullKey, _t3;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (this.isAvailable) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              _context6.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context6.n = 2;
                break;
              }
              fullKey = this._getFullKey(key);
              window.localStorage.removeItem(fullKey);
              _context6.n = 3;
              break;
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context6.n = 3;
                break;
              }
              _context6.n = 3;
              return this._deleteFromIndexedDB(key);
            case 3:
              _context6.n = 5;
              break;
            case 4:
              _context6.p = 4;
              _t3 = _context6.v;
              console.warn('Error deleting from persistent cache:', _t3.message);
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 4]]);
      }));
      function _delete(_x7) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "_deleteFromIndexedDB",
    value: function () {
      var _deleteFromIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(key) {
        var _this5 = this;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (this.db) {
                _context7.n = 1;
                break;
              }
              _context7.n = 1;
              return this._initIndexedDB();
            case 1:
              return _context7.a(2, new Promise(function (resolve, reject) {
                var transaction = _this5.db.transaction(['cache'], 'readwrite');
                var objectStore = transaction.objectStore('cache');
                var request = objectStore["delete"](_this5._getFullKey(key));
                request.onsuccess = function () {
                  resolve();
                };
                request.onerror = function (event) {
                  console.warn('Error deleting from IndexedDB:', event.target.error);
                  reject(event.target.error);
                };
              }));
          }
        }, _callee7, this);
      }));
      function _deleteFromIndexedDB(_x8) {
        return _deleteFromIndexedDB2.apply(this, arguments);
      }
      return _deleteFromIndexedDB;
    }()
  }, {
    key: "clear",
    value: function () {
      var _clear = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var _this6 = this;
        var _t4;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (this.isAvailable) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              _context8.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context8.n = 2;
                break;
              }
              Object.keys(window.localStorage).forEach(function (key) {
                if (key.startsWith("".concat(_this6.namespace, ":"))) {
                  window.localStorage.removeItem(key);
                }
              });
              _context8.n = 3;
              break;
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context8.n = 3;
                break;
              }
              _context8.n = 3;
              return this._clearIndexedDB();
            case 3:
              _context8.n = 5;
              break;
            case 4:
              _context8.p = 4;
              _t4 = _context8.v;
              console.warn('Error clearing persistent cache:', _t4.message);
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 4]]);
      }));
      function clear() {
        return _clear.apply(this, arguments);
      }
      return clear;
    }()
  }, {
    key: "_clearIndexedDB",
    value: function () {
      var _clearIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this7 = this;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (this.db) {
                _context9.n = 1;
                break;
              }
              _context9.n = 1;
              return this._initIndexedDB();
            case 1:
              return _context9.a(2, new Promise(function (resolve, reject) {
                var transaction = _this7.db.transaction(['cache'], 'readwrite');
                var objectStore = transaction.objectStore('cache');
                var request = objectStore.index('namespace').openCursor(IDBKeyRange.only(_this7.namespace));
                request.onsuccess = function (event) {
                  var cursor = event.target.result;
                  if (cursor) {
                    cursor["delete"]();
                    cursor["continue"]();
                  } else {
                    resolve();
                  }
                };
                request.onerror = function (event) {
                  console.warn('Error clearing IndexedDB:', event.target.error);
                  reject(event.target.error);
                };
              }));
          }
        }, _callee9, this);
      }));
      function _clearIndexedDB() {
        return _clearIndexedDB2.apply(this, arguments);
      }
      return _clearIndexedDB;
    }()
  }, {
    key: "has",
    value: function () {
      var _has = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(key) {
        var fullKey, _t5;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              if (this.isAvailable) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2, false);
            case 1:
              _context0.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context0.n = 2;
                break;
              }
              fullKey = this._getFullKey(key);
              return _context0.a(2, window.localStorage.getItem(fullKey) !== null);
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context0.n = 4;
                break;
              }
              _context0.n = 3;
              return this._hasInIndexedDB(key);
            case 3:
              return _context0.a(2, _context0.v);
            case 4:
              _context0.n = 6;
              break;
            case 5:
              _context0.p = 5;
              _t5 = _context0.v;
              return _context0.a(2, false);
            case 6:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 5]]);
      }));
      function has(_x9) {
        return _has.apply(this, arguments);
      }
      return has;
    }()
  }, {
    key: "_hasInIndexedDB",
    value: function () {
      var _hasInIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(key) {
        var _this8 = this;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (this.db) {
                _context1.n = 1;
                break;
              }
              _context1.n = 1;
              return this._initIndexedDB();
            case 1:
              return _context1.a(2, new Promise(function (resolve, reject) {
                var transaction = _this8.db.transaction(['cache'], 'readonly');
                var objectStore = transaction.objectStore('cache');
                var request = objectStore.getKey(_this8._getFullKey(key));
                request.onsuccess = function (event) {
                  resolve(event.target.result !== undefined);
                };
                request.onerror = function (event) {
                  console.warn('Error checking IndexedDB:', event.target.error);
                  resolve(false);
                };
              }));
          }
        }, _callee1, this);
      }));
      function _hasInIndexedDB(_x0) {
        return _hasInIndexedDB2.apply(this, arguments);
      }
      return _hasInIndexedDB;
    }()
  }, {
    key: "keys",
    value: function () {
      var _keys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var prefix, _t6;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              if (this.isAvailable) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, []);
            case 1:
              _context10.p = 1;
              if (!(this.storageType === 'localStorage')) {
                _context10.n = 2;
                break;
              }
              prefix = "".concat(this.namespace, ":");
              return _context10.a(2, Object.keys(window.localStorage).filter(function (key) {
                return key.startsWith(prefix);
              }).map(function (key) {
                return key.substring(prefix.length);
              }));
            case 2:
              if (!(this.storageType === 'indexedDB')) {
                _context10.n = 4;
                break;
              }
              _context10.n = 3;
              return this._keysFromIndexedDB();
            case 3:
              return _context10.a(2, _context10.v);
            case 4:
              _context10.n = 6;
              break;
            case 5:
              _context10.p = 5;
              _t6 = _context10.v;
              return _context10.a(2, []);
            case 6:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 5]]);
      }));
      function keys() {
        return _keys.apply(this, arguments);
      }
      return keys;
    }()
  }, {
    key: "_keysFromIndexedDB",
    value: function () {
      var _keysFromIndexedDB2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var _this9 = this;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (this.db) {
                _context11.n = 1;
                break;
              }
              _context11.n = 1;
              return this._initIndexedDB();
            case 1:
              return _context11.a(2, new Promise(function (resolve, reject) {
                var keys = [];
                var transaction = _this9.db.transaction(['cache'], 'readonly');
                var objectStore = transaction.objectStore('cache');
                var index = objectStore.index('namespace');
                var request = index.openCursor(IDBKeyRange.only(_this9.namespace));
                request.onsuccess = function (event) {
                  var cursor = event.target.result;
                  if (cursor) {
                    keys.push(cursor.value.key.replace("".concat(_this9.namespace, ":"), ''));
                    cursor["continue"]();
                  } else {
                    resolve(keys);
                  }
                };
                request.onerror = function (event) {
                  console.warn('Error getting keys from IndexedDB:', event.target.error);
                  resolve([]);
                };
              }));
          }
        }, _callee11, this);
      }));
      function _keysFromIndexedDB() {
        return _keysFromIndexedDB2.apply(this, arguments);
      }
      return _keysFromIndexedDB;
    }()
  }, {
    key: "_getFullKey",
    value: function _getFullKey(key) {
      return "".concat(this.namespace, ":").concat(key);
    }
  }, {
    key: "_compress",
    value: function _compress(value) {
      // TODO: Implement compression logic
      return value;
    }
  }, {
    key: "_decompress",
    value: function _decompress(value) {
      // TODO: Implement decompression logic
      return value;
    }
  }]);
}();
var _default = exports["default"] = PersistentCache;