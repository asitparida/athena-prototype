process.env.HMR_PORT=59185;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
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
})({"helpers/dock.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const electron_1 = require("electron");

function BuildMenu() {
  const dockMenu = electron_1.Menu.buildFromTemplate([{
    label: 'All Clips'
  }, {
    label: 'Workspace',
    submenu: [{
      label: 'Workspace #1'
    }, {
      label: 'Workspace #2'
    }, {
      label: 'Workspace #3'
    }]
  }]);
  electron_1.app.dock.setMenu(dockMenu);
  electron_1.app.dock.show();
}

exports.BuildMenu = BuildMenu;
},{}],"assets/network.png":[function(require,module,exports) {
module.exports = "/network.91e8a37e.png";
},{}],"helpers/ipc-helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function GetIpcFileFixUrl() {
  const splits = __dirname.split('/');

  const file = splits.splice(0, splits.length - 2).join('/') + '/electron-ipc.js';
  return file;
}

exports.GetIpcFileFixUrl = GetIpcFileFixUrl;
},{}],"helpers/annotator.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const electron_1 = require("electron");

const url_1 = require("url");

const ipc_helper_1 = require("./ipc-helper");

const {
  resolve
} = require('app-root-path');

const isDev = require('electron-is-dev');

function BuildAnnotator() {
  const window = new electron_1.BrowserWindow({
    // parent: mainWindow,
    width: 300,
    height: 200,
    show: false,
    transparent: true,
    // resizable: false,
    fullscreenable: false,
    vibrancy: 'ultra-dark',
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    webPreferences: {
      webSecurity: false,
      scrollBounce: true,
      nodeIntegration: false,
      preload: ipc_helper_1.GetIpcFileFixUrl()
    }
  });
  window.once('ready-to-show', () => {
    window.show();
    window.focus();

    if (isDev && false) {
      window.webContents.openDevTools();
    }
  });
  const devPath = 'http://localhost:1125';
  const prodPath = url_1.format({
    pathname: resolve('app/widgets/annotator/.parcel/production/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const url = isDev ? devPath : prodPath;
  window.setMenu(null);
  window.loadURL(url);
}

exports.BuildAnnotator = BuildAnnotator;
},{"./ipc-helper":"helpers/ipc-helper.ts"}],"helpers/tray.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const electron_1 = require("electron");

const network_png_1 = __importDefault(require("../assets/network.png"));

const annotator_1 = require("./annotator");

let tray = null;

function BuildTray(win) {
  const image = electron_1.nativeImage.createFromPath(__dirname + network_png_1.default);
  image.resize({
    width: 30,
    height: 30
  });
  tray = new electron_1.Tray(image);
  tray.setImage(image);

  const onClick = () => {
    const isVisible = win.isFocused();

    if (!isVisible) {
      win.focus();
    }
  };

  const contextMenu = electron_1.Menu.buildFromTemplate([{
    label: 'New Note',
    click: () => {
      annotator_1.BuildAnnotator();
    }
  }, {
    label: 'All Clips',
    click: onClick
  }, {
    label: 'Workspace #1',
    click: onClick
  }, {
    label: 'Workspace #2',
    click: onClick
  }, {
    label: 'Workspace #3',
    click: onClick
  }]);
  tray.setContextMenu(contextMenu);
}

exports.BuildTray = BuildTray;
},{"../assets/network.png":"assets/network.png","./annotator":"helpers/annotator.ts"}],"helpers/screen.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const electron_1 = require("electron");

const _ = __importStar(require("lodash"));

function GetExternalDisplay() {
  let displays = electron_1.screen.getAllDisplays();
  let externalDisplays = displays.filter(display => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  console.log(displays);
}

exports.GetExternalDisplay = GetExternalDisplay;

const onMainWindowMoved = mainWindow => {
  let winBounds = mainWindow.getBounds();
  let whichScreen = electron_1.screen.getDisplayNearestPoint({
    x: winBounds.x,
    y: winBounds.y
  });
  mainWindow.setBounds(whichScreen.bounds, true);
};

exports.onMovedDebounced = _.debounce(onMainWindowMoved, 200);
},{}],"../api/app.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const express = require('express');

const cors = require('cors');

const bodyParser = __importStar(require("body-parser"));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

function GetQueryParams(req) {
  const params = {};

  if (req.query) {
    // tslint:disable-next-line:forin
    for (const prop in req.query) {
      params[prop] = req.query[prop];
    }
  }

  return params;
}

app.get('/api/meta/', (req, res) => {
  res.json({
    data: 'AWESOME'
  });
});
exports.default = app;
},{}],"../api/server.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const app_1 = __importDefault(require("./app"));

const helmet = require('helmet');

const compression = require('compression');

const net = require('net');

function GetAvailablePort(startingAt) {
  function GetNextAvailablePort(currentPort, cb) {
    const server = net.createServer();
    server.listen(currentPort, () => {
      server.once('close', () => {
        cb(currentPort);
      });
      server.close();
    });
    server.on('error', () => {
      GetNextAvailablePort(++currentPort, cb);
    });
  }

  return new Promise((resolve, reject) => {
    GetNextAvailablePort(startingAt, resolve);
  });
}

async function GetAPIServer() {
  app_1.default.use(helmet()); // set well-known security-related HTTP headers

  app_1.default.use(compression());
  app_1.default.disable('x-powered-by');
  const port = await GetAvailablePort(1000);
  const server = app_1.default.listen(port, () => console.log('Starting ExpressJS API server on Port 8081'));
  return {
    server: app_1.default,
    API_PORT: port
  };
}

exports.GetAPIServer = GetAPIServer;
},{"./app":"../api/app.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const dock_1 = require("./helpers/dock");

const tray_1 = require("./helpers/tray");

const screen_1 = require("./helpers/screen");

const url_1 = require("url");

const annotator_1 = require("./helpers/annotator");

const ipc_helper_1 = require("./helpers/ipc-helper");

const server_1 = require("../api/server");

const electron = require('electron');

const {
  BrowserWindow,
  app
} = electron;

const isDev = require('electron-is-dev');

const {
  resolve
} = require('app-root-path');

app.on('ready', async () => {
  dock_1.BuildMenu();
  app.setName('Athena Prototype');
  const size = electron.screen.getPrimaryDisplay().size;
  const mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height - 22,
    show: false,
    transparent: true,
    resizable: false,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    vibrancy: 'ultra-dark',
    webPreferences: {
      webSecurity: false,
      scrollBounce: true,
      nodeIntegration: false,
      preload: ipc_helper_1.GetIpcFileFixUrl()
    }
  });
  tray_1.BuildTray(mainWindow);
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    if (isDev && false) {
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.on('move', screen_1.onMovedDebounced.bind(this, mainWindow));
  const devPath = 'http://localhost:1124';
  const prodPath = url_1.format({
    pathname: resolve('app/renderer/.parcel/production/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const url = isDev ? devPath : prodPath;
  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
  electron.ipcMain.on('launch-annotator', () => {
    annotator_1.BuildAnnotator();
  });
  const server = await server_1.GetAPIServer(); // tslint:disable-next-line:no-string-literal

  mainWindow['API_PORT'] = server.API_PORT;
});
app.on('window-all-closed', app.quit);
},{"./helpers/dock":"helpers/dock.ts","./helpers/tray":"helpers/tray.ts","./helpers/screen":"helpers/screen.ts","./helpers/annotator":"helpers/annotator.ts","./helpers/ipc-helper":"helpers/ipc-helper.ts","../api/server":"../api/server.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function(asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function(asset) {
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
      }
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = (
    '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
      '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
      '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
      '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' +
      '<pre>' + stackTrace.innerHTML + '</pre>' +
    '</div>'
  );

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
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
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
    return hmrAcceptCheck(global.parcelRequire, id)
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

},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.js.map