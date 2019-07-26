// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"lib/instagram.embed.js":[function(require,module,exports) {
var process = require("process");
var global = arguments[3];
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var global = this;

  var __BUNDLE_START_TIME__ = this.nativePerformanceNow ? nativePerformanceNow() : Date.now(),
      __DEV__ = false,
      process = this.process || {};

  process.env = process.env || {};
  "development" = "development" || "production";
  !function (t) {
    "use strict";

    function e() {
      return s = Object.create(null);
    }

    function r(t) {
      var e = t,
          r = s[e];
      return r && r.isInitialized ? r.publicModule.exports : i(e, r);
    }

    function n(t) {
      var e = t;
      if (s[e] && s[e].importedDefault !== f) return s[e].importedDefault;
      var n = r(e),
          o = n && n.__esModule ? n.default : n;
      return s[e].importedDefault = o;
    }

    function o(t) {
      var e = t;
      if (s[e] && s[e].importedAll !== f) return s[e].importedAll;
      var n = r(e);
      var o;
      if (n && n.__esModule) o = n;else {
        if (o = {}, n) for (var _t in n) {
          a.call(n, _t) && (o[_t] = n[_t]);
        }
        o.default = n;
      }
      return s[e].importedAll = o;
    }

    function i(e, r) {
      if (!p && t.ErrorUtils) {
        p = !0;

        var _n;

        try {
          _n = c(e, r);
        } catch (e) {
          t.ErrorUtils.reportFatalError(e);
        }

        return p = !1, _n;
      }

      return c(e, r);
    }

    function l(t) {
      return {
        segmentId: t >>> h,
        localId: t & m
      };
    }

    function c(e, i) {
      if (!i && I.length > 0) {
        var _t2 = l(e),
            _r = _t2.segmentId,
            _n2 = _t2.localId,
            _o = I[_r];

        null != _o && (_o(_n2), i = s[e]);
      }

      var c = t.nativeRequire;

      if (!i && c) {
        var _t3 = l(e),
            _r2 = _t3.segmentId;

        c(_t3.localId, _r2), i = s[e];
      }

      if (!i) throw u(e);
      if (i.hasError) throw d(e, i.error);
      i.isInitialized = !0;
      var f = i,
          a = f.factory,
          p = f.dependencyMap;

      try {
        var _l = i.publicModule;
        if (_l.id = e, g.length > 0) for (var _t4 = 0; _t4 < g.length; ++_t4) {
          g[_t4].cb(e, _l);
        }
        return a(t, r, n, o, _l, _l.exports, p), i.factory = void 0, i.dependencyMap = void 0, _l.exports;
      } catch (t) {
        throw i.hasError = !0, i.error = t, i.isInitialized = !1, i.publicModule.exports = void 0, t;
      }
    }

    function u(t) {
      var e = 'Requiring unknown module "' + t + '".';
      return Error(e);
    }

    function d(t, e) {
      var r = t;
      return Error('Requiring module "' + r + '", which threw an exception: ' + e);
    }

    t.__r = r, t.__d = function (t, e, r) {
      null == s[e] && (s[e] = {
        dependencyMap: r,
        factory: t,
        hasError: !1,
        importedAll: f,
        importedDefault: f,
        isInitialized: !1,
        publicModule: {
          exports: {}
        }
      });
    }, t.__c = e, t.__registerSegment = function (t, e) {
      I[t] = e;
    };
    var s = e();
    var f = {},
        a = {}.hasOwnProperty;
    r.importDefault = n, r.importAll = o;
    var p = !1;
    var h = 16,
        m = 65535;
    r.unpackModuleId = l, r.packModuleId = function (t) {
      return (t.segmentId << h) + t.localId;
    };
    var g = [];

    r.registerHook = function (t) {
      var e = {
        cb: t
      };
      return g.push(e), {
        release: function release() {
          for (var _t5 = 0; _t5 < g.length; ++_t5) {
            if (g[_t5] === e) {
              g.splice(_t5, 1);
              break;
            }
          }
        }
      };
    };

    var I = [];
  }('undefined' != typeof global ? global : 'undefined' != typeof window ? window : this);
  __s = {
    "js": {},
    "css": {}
  };
  var __d = this.__d;

  __d(function (g, r, i, a, m, e, d) {
    "use strict";

    function t(t) {
      return !isNaN(Number(t));
    }

    function n(t, n) {
      t.className += ' ' + n;
    }

    function o(t, n) {
      t.className = t.className.replace(n, '');
    }

    function s(t) {
      var n = document.getElementsByTagName('iframe');
      var o;

      for (var _s = n.length - 1; _s >= 0; _s--) {
        var _c = n[_s];

        if (_c.contentWindow === t.source) {
          o = _c;
          break;
        }
      }

      return o;
    }

    function c(t) {
      var n = t.clientWidth,
          o = window.devicePixelRatio;
      return n && o ? parseInt(n * o, 10) : 0;
    }

    function l(t) {
      var n = t.match(v);
      return n ? n[1].replace(/^https?:\/\/(www.)?/, 'https://www.') + '/' : null;
    }

    function u(t) {
      if (t.hasAttribute(_)) return t.getAttribute(_);
      var n = t.getElementsByTagName('a');

      for (var _t6 = n.length - 1; _t6 >= 0; _t6--) {
        var _o2 = l(n[_t6].href);

        if (_o2) return _o2;
      }

      return null;
    }

    function p(t) {
      'performance' in window && null != window.performance && 'object' == _typeof(window.performance) && 'function' == typeof window.performance.now && t(window.performance.now());
    }

    function f(s, l) {
      var u = J++,
          f = A + u,
          w = {};
      s.id || (s.id = j + u);
      var h = l.replace(O, '$1/');

      if (h += 'embed/', s.hasAttribute(N) && (h += 'captioned/'), h += '?cr=1', s.hasAttribute(G)) {
        var _n3 = parseInt(s.getAttribute(G), 10);

        t(_n3) && (h += '&v=' + _n3);
      }

      var y = c(s);
      y && (h += '&wp=' + y.toString()), h += '&rd=' + encodeURIComponent(window.location.origin);
      var C = window.location.pathname;

      if (C) {
        var _t7 = C + (window.location.search || '');

        h += '&rp=' + encodeURIComponent(_t7.substring(0, 200));
      }

      h = h.replace(k, I), w.ci = u, p(function (t) {
        w.os = t;
      });
      var B = encodeURIComponent(JSON.stringify(w)),
          L = document.createElement('iframe');
      L.className = s.className, L.id = f, L.src = h + '#' + B, L.setAttribute('allowTransparency', 'true'), L.setAttribute('allowfullscreen', 'true');
      var _ = s.style.position;
      _ && L.setAttribute($, _), L.setAttribute('frameBorder', '0'), L.setAttribute('height', '0'), L.setAttribute(R, s.id), L.setAttribute('scrolling', 'no'), L.setAttribute('style', s.style.cssText + ';' + x), L.style.position = 'absolute', s.parentNode.insertBefore(L, s), n(s, U), o(s, T), D[f] = !0, p(function (t) {
        W[f] = {
          frameLoading: t
        };
      }), setTimeout(function () {
        b(f);
      }, E);
    }

    function b(t) {
      D.hasOwnProperty(t) && (delete D[t], h());
    }

    function w(t) {
      if (!L.test(t.origin)) return;
      var o = s(t);
      if (!o) return;
      var c = o.id;
      var l;

      try {
        l = JSON.parse(t.data);
      } catch (t) {}

      if ('object' != _typeof(l) || 'string' != typeof l.type || 'object' != _typeof(l.details)) return;
      var _l2 = l,
          u = _l2.details,
          f = _l2.type;
      var w = null;

      switch (f) {
        case i(d[0]).MOUNTED:
          {
            var _t8 = document.getElementById(o.getAttribute(R));

            if (_t8 || i(d[1])(0), w = _t8.clientHeight, o.style.position = o.hasAttribute($) ? o.getAttribute($) : '', 'object' == _typeof(u.styles) && u.styles.length) try {
              for (var _t9 = 0; _t9 < u.styles.length; _t9++) {
                var _n4 = u.styles[_t9][0],
                    _s2 = u.styles[_t9][1];
                o.style[_n4] = _s2;
              }
            } catch (t) {}
            n(o, B), _t8.parentNode && _t8.parentNode.removeChild(_t8), b(c), p(function (t) {
              W[c] && (W[c].contentLoaded = t, window.__igEmbedLoaded && window.__igEmbedLoaded({
                frameId: c,
                stats: W[c]
              }));
            });
            break;
          }

        case i(d[0]).LOADING:
          p(function (t) {
            W[c] && (W[c].contentLoading = t);
          });
          break;

        case i(d[0]).MEASURE:
          {
            var _t10 = u.height;
            S[c] !== _t10 && (w = _t10);
            break;
          }

        case i(d[0]).UNMOUNTING:
          delete S[c];
      }

      null !== w && (o.height = S[c] = w);
    }

    function h() {
      var t = document.getElementsByClassName(T);

      for (var _n5 = 0; _n5 < t.length; _n5++) {
        if (Object.keys(D).length >= C) break;
        var _o3 = t[_n5];

        if ('BLOCKQUOTE' === _o3.tagName) {
          var _t11 = u(_o3);

          _t11 && f(_o3, _t11);
        }
      }
    }

    function y() {
      var _this = this;

      if (!M) {
        if (P) return;
        P = !0;
      }

      i(d[2])(function () {
        h(), M || (i(d[3]).add(window, 'message', w.bind(_this)), M = !0);
      });
    }

    var N = 'data-instgrm-captioned',
        A = 'instagram-embed-',
        E = 1e4,
        x = "\n  background-color: white;\n  border-radius: 3px;\n  border: 1px solid #dbdbdb;\n  box-shadow: none;\n  display: block;\n  margin: 0;\n  min-width: 326px;\n  padding: 0;\n",
        k = /^https?:\/\//,
        I = 'https://',
        O = /^(.*?)\/?(\?.*|#|$)/,
        C = 3,
        T = 'instagram-media',
        U = "instagram-media-registered",
        B = "instagram-media-rendered",
        L = new RegExp("^https?://([\\w-]+\\.)*(" + ['instagram\\.com', 'instagr\\.am'].join('|') + ")$"),
        R = 'data-instgrm-payload-id',
        j = 'instagram-media-payload-',
        _ = 'data-instgrm-permalink',
        v = new RegExp('^(' + L.source.replace(/^\^/, '').replace(/\$$/, '') + "/p/[^/]+)"),
        $ = 'data-instgrm-preserve-position',
        G = 'data-instgrm-version',
        S = {};
    var M = !1;
    var D = {};
    var J = 0,
        P = !1;
    var W = {};
    r(d[4]).getGlobalContext().process || (y(), r(d[4]).getGlobalContext().process = y);
  }, 0, [1, 2, 3, 4, 5]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = {
      MOUNTED: "MOUNTED",
      LOADING: "LOADING",
      UNMOUNTING: "UNMOUNTING",
      MEASURE: "MEASURE"
    };
  }, 1, []);

  __d(function (g, r, i, a, m, e, d) {
    'use strict';

    var n = r(d[0]);

    m.exports = function (o, t) {
      if (!o) {
        var _o4;

        if (void 0 === t) _o4 = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
          var l = [t];

          for (var _n6 = 2, _o5 = arguments.length; _n6 < _o5; _n6++) {
            l.push(arguments[_n6]);
          }

          (_o4 = new Error(n.apply(null, l))).name = 'Invariant Violation', _o4.messageWithParams = l;
        }
        throw _o4.framesToPop = 1, _o4;
      }
    };
  }, 2, [6]);

  __d(function (g, r, i, a, m, e, d) {
    var n = function n() {
      for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
        t[_key] = arguments[_key];
      }

      return (t = t.map(function (n) {
        return String(n);
      }))[0].split('%s').length !== t.length ? n('ex args number mismatch: %s', JSON.stringify(t)) : n._prefix + JSON.stringify(t) + n._suffix;
    };

    n._prefix = '<![EX[', n._suffix = ']]>', m.exports = n;
  }, 6, []);

  __d(function (g, r, i, a, m, e, d) {
    "use strict";

    function t() {
      if (!o) return;
      var t;

      for (; t = o.shift();) {
        t();
      }

      o = null;
    }

    Object.defineProperty(e, '__esModule', {
      value: !0
    });
    var o = null;

    if (r(d[0]).canUseDOM) {
      var n, u;
      var c = null === (n = document) || void 0 === n ? void 0 : null === (u = n.documentElement) || void 0 === u ? void 0 : u.doScroll;

      if (!('readyState' in document ? 'complete' === document.readyState || 'loading' !== document.readyState && !c : !!document.body) && (o = [], i(d[1]).add(document, 'DOMContentLoaded', t), i(d[1]).add(window, 'load', t), c && window === window.top)) {
        var _o6 = function _o6() {
          try {
            c('left');
          } catch (t) {
            return void setTimeout(_o6, 0);
          }

          t();
        };

        _o6();
      }
    }

    e.default = function (t) {
      o ? o.push(t) : t();
    };
  }, 3, [7, 4]);

  __d(function (g, r, i, a, m, e, d) {
    'use strict';

    var n = !('undefined' == typeof window || !window.document || !window.document.createElement || window._ssr),
        t = {
      canUseDOM: n,
      canUseWorkers: 'undefined' != typeof Worker,
      canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
      canUseViewport: n && !!window.screen,
      isInWorker: !n
    };
    m.exports = t;
  }, 7, []);

  __d(function (g, r, i, a, m, e, d) {
    "use strict";

    Object.defineProperty(e, '__esModule', {
      value: !0
    });
    var t = !1;
    var n = i(d[0])(function () {
      try {
        var _n7 = Object.defineProperty({}, 'passive', {
          get: function get() {
            t = !0;
          }
        });

        r(d[1]).canUseDOM && (window.addEventListener('test', null, _n7), window.removeEventListener('test', null, _n7));
      } catch (t) {}

      return t;
    }),
        s = {
      capture: !1
    };

    var l =
    /*#__PURE__*/
    function () {
      function l(t) {
        _classCallCheck(this, l);

        this.$EventListenerHelper1 = null, this.$EventListenerHelper1 = t;
      }

      _createClass(l, [{
        key: "remove",
        value: function remove() {
          this.$EventListenerHelper1 && (this.$EventListenerHelper1(), this.$EventListenerHelper1 = null);
        }
      }], [{
        key: "add",
        value: function add(t, o, c) {
          var u = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : s;
          var v = u;
          return n() || (v = 'boolean' != typeof u && !!u.capture), t.addEventListener(o, c, v), new l(function () {
            t.removeEventListener(o, c, v);
          });
        }
      }]);

      return l;
    }();

    e.default = l;
  }, 4, [8, 7]);

  __d(function (g, r, i, a, m, e, d) {
    function n(c, o) {
      if ('function' != typeof c || null != o && 'function' != typeof o) throw new TypeError(t);

      var f = function f() {
        var n = arguments,
            t = o ? o.apply(this, n) : n[0],
            u = f.cache;
        if (u.has(t)) return u.get(t);
        var h = c.apply(this, n);
        return f.cache = u.set(t, h) || u, h;
      };

      return f.cache = new (n.Cache || r(d[0]))(), f;
    }

    var t = 'Expected a function';
    n.Cache = r(d[0]), m.exports = n;
  }, 8, [9]);

  __d(function (g, r, i, a, m, e, d) {
    function t(t) {
      var o = -1,
          p = null == t ? 0 : t.length;

      for (this.clear(); ++o < p;) {
        var l = t[o];
        this.set(l[0], l[1]);
      }
    }

    t.prototype.clear = r(d[0]), t.prototype.delete = r(d[1]), t.prototype.get = r(d[2]), t.prototype.has = r(d[3]), t.prototype.set = r(d[4]), m.exports = t;
  }, 9, [10, 11, 12, 13, 14]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function () {
      this.size = 0, this.__data__ = {
        hash: new (r(d[0]))(),
        map: new (r(d[1]) || r(d[2]))(),
        string: new (r(d[0]))()
      };
    };
  }, 10, [15, 16, 17]);

  __d(function (g, r, i, a, m, e, d) {
    function t(t) {
      var o = -1,
          p = null == t ? 0 : t.length;

      for (this.clear(); ++o < p;) {
        var l = t[o];
        this.set(l[0], l[1]);
      }
    }

    t.prototype.clear = r(d[0]), t.prototype.delete = r(d[1]), t.prototype.get = r(d[2]), t.prototype.has = r(d[3]), t.prototype.set = r(d[4]), m.exports = t;
  }, 15, [18, 19, 20, 21, 22]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function () {
      this.__data__ = r(d[0]) ? r(d[0])(null) : {}, this.size = 0;
    };
  }, 18, [23]);

  __d(function (g, r, i, a, m, e, d) {
    var t = r(d[0])(Object, 'create');
    m.exports = t;
  }, 23, [24]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n, o) {
      var t = r(d[0])(n, o);
      return r(d[1])(t) ? t : void 0;
    };
  }, 24, [25, 26]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n, o) {
      return null == n ? void 0 : n[o];
    };
  }, 25, []);

  __d(function (g, r, i, a, m, e, d) {
    var t = /^\[object .+?Constructor\]$/,
        o = Function.prototype,
        n = Object.prototype,
        c = o.toString,
        p = n.hasOwnProperty,
        u = RegExp('^' + c.call(p).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

    m.exports = function (o) {
      return !(!r(d[0])(o) || r(d[1])(o)) && (r(d[2])(o) ? u : t).test(r(d[3])(o));
    };
  }, 26, [27, 28, 29, 30]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n) {
      var t = _typeof(n);

      return null != n && ('object' == t || 'function' == t);
    };
  }, 27, []);

  __d(function (g, r, i, a, m, e, d) {
    var n = function () {
      var n = /[^.]+$/.exec(r(d[0]) && r(d[0]).keys && r(d[0]).keys.IE_PROTO || '');
      return n ? 'Symbol(src)_1.' + n : '';
    }();

    m.exports = function (t) {
      return !!n && n in t;
    };
  }, 28, [31]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = r(d[0])['__core-js_shared__'];
  }, 31, [32]);

  __d(function (g, r, i, a, m, e, d) {
    var t = 'object' == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        f = r(d[0]) || t || Function('return this')();
    m.exports = f;
  }, 32, [33]);

  __d(function (g, r, i, a, m, e, d) {
    var t = 'object' == _typeof(g) && g && g.Object === Object && g;
    m.exports = t;
  }, 33, []);

  __d(function (g, r, i, a, m, e, d) {
    var n = '[object AsyncFunction]',
        t = '[object Function]',
        o = '[object GeneratorFunction]',
        c = '[object Proxy]';

    m.exports = function (u) {
      if (!r(d[0])(u)) return !1;
      var b = r(d[1])(u);
      return b == t || b == o || b == n || b == c;
    };
  }, 29, [27, 34]);

  __d(function (g, r, i, a, m, e, d) {
    var n = '[object Null]',
        t = '[object Undefined]',
        o = r(d[0]) ? r(d[0]).toStringTag : void 0;

    m.exports = function (c) {
      return null == c ? void 0 === c ? t : n : o && o in Object(c) ? r(d[1])(c) : r(d[2])(c);
    };
  }, 34, [35, 36, 37]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = r(d[0]).Symbol;
  }, 35, [32]);

  __d(function (g, r, i, a, m, e, d) {
    var t = Object.prototype,
        o = t.hasOwnProperty,
        n = t.toString,
        c = r(d[0]) ? r(d[0]).toStringTag : void 0;

    m.exports = function (t) {
      var l = o.call(t, c),
          v = t[c];

      try {
        t[c] = void 0;
      } catch (t) {}

      var p = n.call(t);
      return l ? t[c] = v : delete t[c], p;
    };
  }, 36, [35]);

  __d(function (g, r, i, a, m, e, d) {
    var t = Object.prototype.toString;

    m.exports = function (n) {
      return t.call(n);
    };
  }, 37, []);

  __d(function (g, r, i, a, m, e, d) {
    var t = Function.prototype.toString;

    m.exports = function (n) {
      if (null != n) {
        try {
          return t.call(n);
        } catch (t) {}

        try {
          return n + '';
        } catch (t) {}
      }

      return '';
    };
  }, 30, []);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t) {
      var s = this.has(t) && delete this.__data__[t];
      return this.size -= s ? 1 : 0, s;
    };
  }, 19, []);

  __d(function (g, r, i, a, m, e, d) {
    var _ = '__lodash_hash_undefined__',
        t = Object.prototype.hasOwnProperty;

    m.exports = function (n) {
      var o = this.__data__;

      if (r(d[0])) {
        var h = o[n];
        return h === _ ? void 0 : h;
      }

      return t.call(o, n) ? o[n] : void 0;
    };
  }, 20, [23]);

  __d(function (g, r, i, a, m, e, d) {
    var t = Object.prototype.hasOwnProperty;

    m.exports = function (o) {
      var n = this.__data__;
      return r(d[0]) ? void 0 !== n[o] : t.call(n, o);
    };
  }, 21, [23]);

  __d(function (g, r, i, a, m, e, d) {
    var _ = '__lodash_hash_undefined__';

    m.exports = function (s, t) {
      var h = this.__data__;
      return this.size += this.has(s) ? 0 : 1, h[s] = r(d[0]) && void 0 === t ? _ : t, this;
    };
  }, 22, [23]);

  __d(function (g, r, i, a, m, e, d) {
    var n = r(d[0])(r(d[1]), 'Map');
    m.exports = n;
  }, 16, [24, 32]);

  __d(function (g, r, i, a, m, e, d) {
    function t(t) {
      var o = -1,
          p = null == t ? 0 : t.length;

      for (this.clear(); ++o < p;) {
        var l = t[o];
        this.set(l[0], l[1]);
      }
    }

    t.prototype.clear = r(d[0]), t.prototype.delete = r(d[1]), t.prototype.get = r(d[2]), t.prototype.has = r(d[3]), t.prototype.set = r(d[4]), m.exports = t;
  }, 17, [38, 39, 40, 41, 42]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function () {
      this.__data__ = [], this.size = 0;
    };
  }, 38, []);

  __d(function (g, r, i, a, m, e, d) {
    var t = Array.prototype.splice;

    m.exports = function (n) {
      var o = this.__data__,
          p = r(d[0])(o, n);
      return !(p < 0 || (p == o.length - 1 ? o.pop() : t.call(o, p, 1), --this.size, 0));
    };
  }, 39, [43]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n, t) {
      for (var f = n.length; f--;) {
        if (r(d[0])(n[f][0], t)) return f;
      }

      return -1;
    };
  }, 43, [44]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n, t) {
      return n === t || n != n && t != t;
    };
  }, 44, []);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t) {
      var _ = this.__data__,
          n = r(d[0])(_, t);
      return n < 0 ? void 0 : _[n][1];
    };
  }, 40, [43]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t) {
      return r(d[0])(this.__data__, t) > -1;
    };
  }, 41, [43]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t, s) {
      var _ = this.__data__,
          n = r(d[0])(_, t);
      return n < 0 ? (++this.size, _.push([t, s])) : _[n][1] = s, this;
    };
  }, 42, [43]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t) {
      var n = r(d[0])(this, t).delete(t);
      return this.size -= n ? 1 : 0, n;
    };
  }, 11, [45]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t, n) {
      var _ = t.__data__;
      return r(d[0])(n) ? _['string' == typeof n ? 'string' : 'hash'] : _.map;
    };
  }, 45, [46]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n) {
      var o = _typeof(n);

      return 'string' == o || 'number' == o || 'symbol' == o || 'boolean' == o ? '__proto__' !== n : null === n;
    };
  }, 46, []);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (t) {
      return r(d[0])(this, t).get(t);
    };
  }, 12, [45]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (n) {
      return r(d[0])(this, n).has(n);
    };
  }, 13, [45]);

  __d(function (g, r, i, a, m, e, d) {
    m.exports = function (s, t) {
      var n = r(d[0])(this, s),
          h = n.size;
      return n.set(s, t), this.size += n.size == h ? 0 : 1, this;
    };
  }, 14, [45]);

  __d(function (g, r, i, a, m, e, d) {
    "use strict";

    Object.defineProperty(e, '__esModule', {
      value: !0
    }), window.instgrm || (window.instgrm = {
      Embeds: {}
    }), e.getGlobalContext = function () {
      return window.instgrm.Embeds;
    };
  }, 5, []);

  global.__r(0);
}).call({});
},{"process":"../../node_modules/process/browser.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52411" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","lib/instagram.embed.js"], null)
//# sourceMappingURL=/instagram.embed.4f07e36d.js.map