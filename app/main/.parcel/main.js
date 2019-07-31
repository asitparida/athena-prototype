process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bzVR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("electron");function l(){const l=e.Menu.buildFromTemplate([{label:"All Clips"},{label:"Workspace",submenu:[{label:"Workspace #1"},{label:"Workspace #2"},{label:"Workspace #3"}]}]);e.app.dock.setMenu(l),e.app.dock.show()}exports.BuildMenu=l;
},{}],"6beC":[function(require,module,exports) {
module.exports="/owl.34a066de.png";
},{}],"jrzg":[function(require,module,exports) {
"use strict";function e(){const e=__dirname.split("/");return e.splice(0,e.length-2).join("/")+"/electron-ipc.js"}Object.defineProperty(exports,"__esModule",{value:!0}),exports.GetIpcFileFixUrl=e;
},{}],"06rE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("electron"),r=require("url"),t=require("./ipc-helper"),o=require("../main"),{resolve:i}=require("app-root-path"),n=require("electron-is-dev");function a(){const a=new e.BrowserWindow({width:300,height:200,show:!1,transparent:!1,fullscreenable:!1,minimizable:!1,maximizable:!1,vibrancy:"light",alwaysOnTop:!0,skipTaskbar:!1,frame:!0,webPreferences:{webSecurity:!1,scrollBounce:!0,nodeIntegration:!1,preload:t.GetIpcFileFixUrl()}});a.API_PORT=o.API_PORT,a.once("ready-to-show",()=>{a.setMaximizable(!1),a.setMinimizable(!1),a.show(),a.focus()});const l=r.format({pathname:i("app/widgets/annotator/.parcel/production/index.html"),protocol:"file:",slashes:!0}),s=n?"http://localhost:1125":l;return a.setMenu(null),a.loadURL(s),a}exports.BuildAnnotator=a;
},{"./ipc-helper":"jrzg","../main":"ZCfc"}],"PTX7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("electron"),l=require("../assets/owl.png"),t=require("./annotator");let r=null;function c(c){const o=e.nativeImage.createFromPath(__dirname+l);o.resize({width:30,height:30}),(r=new e.Tray(o)).setImage(o);const a=()=>{c.isFocused()||c.focus()},i=e.Menu.buildFromTemplate([{label:"New Note",click:()=>{t.BuildAnnotator()}},{label:"All Clips",click:a},{label:"Workspace #1",click:a},{label:"Workspace #2",click:a},{label:"Workspace #3",click:a}]);r.setContextMenu(i)}exports.BuildTray=c;
},{"../assets/owl.png":"6beC","./annotator":"06rE"}],"qH2W":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("electron"),r=e(require("lodash"));function s(){t.screen.getAllDisplays().filter(e=>0!==e.bounds.x||0!==e.bounds.y)}exports.GetExternalDisplay=s;const n=e=>{const r=e.getBounds(),s=t.screen.getDisplayNearestPoint({x:r.x,y:r.y});e.setBounds(s.bounds,!0)};exports.onMovedDebounced=r.debounce(n,200);
},{}],"rNlr":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("electron"),r=e(require("fs"));function n(){const e=t.app.getPath("userData")+"/elements.json";return r.existsSync(e)||r.writeFileSync(e,JSON.stringify({})),e}exports.getLocalDBFile=n;
},{}],"a9Cf":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("express"),s=require("cors"),r=e(require("body-parser")),a=require("lowdb"),o=require("lowdb/adapters/FileSync"),i=require("./helpers"),n=e(require("lodash")),d=new o(i.getLocalDBFile()),u=a(d);u.defaults({notes:[]}).write(),u.set("notes",[]).write(),u.set("mms",[]).write();const l=t();function c(e){const t={};if(e.query)for(const s in e.query)t[s]=e.query[s];return t}l.use(s()),l.use(r.urlencoded({extended:!0})),l.use(r.json()),l.get("/api/meta/",(e,t)=>{t.json({data:"AWESOME"})}),l.post("/api/stickies/",(e,t)=>{const s=e.body;let r=u.defaults({posts:[]}).get("notes").value();s.id?r=r.filter(e=>e.id!==s.id):s.id=`${Math.floor(1e9*Math.random())}`,u.set("notes",[].concat(...r,s)).write(),t.json({data:s})}),l.get("/api/stickies/unassigned",(e,t)=>{const s=u.get("notes").filter({assigned:!1}).value();t.json({data:s})}),l.get("/api/mms/",(e,t)=>{const s=u.get("mms").value();t.json({data:s})}),l.get("/api/mms/list",(e,t)=>{const s=u.get("mms").value();t.json({data:s.map(e=>e.sid)})}),l.post("/api/mms",(e,t)=>{const s=e.body,r=u.defaults({posts:[]}).get("mms").value();n.find(r,e=>e.sid===s.sid)?t.json({data:!1}):(u.set("mms",[].concat(...r,s)).write(),t.json({data:!0}))}),exports.default=l;
},{"./helpers":"rNlr"}],"exEY":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=e(require("./app")),t=require("helmet"),o=require("compression"),s=require("net");function n(e){return new Promise((r,t)=>{!function e(r,t){const o=s.createServer();o.listen(r,()=>{o.once("close",()=>{t(r)}),o.close()}),o.on("error",()=>{e(++r,t)})}(e,r)})}async function u(){r.default.use(t()),r.default.use(o()),r.default.disable("x-powered-by");const e=await n(1e3);r.default.listen(e,()=>console.log("Starting ExpressJS API server on Port 8081"));return{server:r.default,API_PORT:e}}exports.GetAPIServer=u;
},{"./app":"a9Cf"}],"OBnq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("electron"),t=require("url"),{resolve:r}=require("app-root-path");let l;function o(){l=new e.BrowserWindow({title:"Element",width:300,height:300,show:!0,transparent:!0,resizable:!1,fullscreenable:!1,titleBarStyle:"customButtonsOnHover",maximizable:!1,minimizable:!1,closable:!1,alwaysOnTop:!0,frame:!1});const o=t.format({pathname:r("build/splash.html"),protocol:"file:",slashes:!0});return l.loadURL(o),l}exports.GetSplashWindow=o;
},{}],"kWfh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("electron");function l(){const l=[{label:e.app.getName(),submenu:[{label:"New",accelerator:"Command+R",click(){console.log("go!")}},{label:"Save",click(){console.log("go!")}},{label:"Sync",click(){console.log("go!")}},{type:"separator"},{role:"Quit"}]},{label:"Edit",submenu:[{label:"Undo",accelerator:"CmdOrCtrl+Z",role:"undo"},{label:"Redo",accelerator:"Shift+CmdOrCtrl+Z",role:"redo"},{type:"separator"},{label:"Cut",accelerator:"CmdOrCtrl+X",role:"cut"},{label:"Copy",accelerator:"CmdOrCtrl+C",role:"copy"},{label:"Paste",accelerator:"CmdOrCtrl+V",role:"paste"},{label:"Select All",accelerator:"CmdOrCtrl+A",role:"selectall"}]},{label:"View",submenu:[{label:"Reload",click:()=>{e.app.relaunch(),e.app.exit()}},{label:"Toggle Full Screen",accelerator:(()=>"darwin"===process.platform?"Ctrl+Command+F":"F11")(),click:(e,l)=>{l&&l.setFullScreen(!l.isFullScreen())}},{label:"Toggle Developer Tools",accelerator:(()=>"darwin"===process.platform?"Alt+Command+I":"Ctrl+Shift+I")(),click:(e,l)=>{l&&l.toggleDevTools()}},{type:"separator"},{label:"App Menu Demo",click:(l,o)=>{if(o){const l={type:"info",title:"Application Menu Demo",buttons:["Ok"],message:"This demo is for the Menu section, showing how to create a clickable menu item in the application menu."};e.dialog.showMessageBox(o,l)}}}]},{label:"Window",submenu:[{label:"Close",click:(l,o)=>{o&&(1===o.id&&e.BrowserWindow.getAllWindows().forEach(e=>{e.id>1&&e.close()}),o.close())}}]}];return e.Menu.buildFromTemplate(l)}exports.GetApplictaionMenu=l;
},{}],"PBYJ":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var s={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(s[t]=e[t]);return s.default=e,s};Object.defineProperty(exports,"__esModule",{value:!0});const s=e(require("lodash")),t=require("../main"),i=require("twilio"),l=require("ext-name");let a,o;const r=5e3;class n{constructor(){this.client=null}initialize(){a=i("AC90fba0e5a6ed99cd255ff123b538f952","5eef95c80c2e25f2b2b839c564aae09d"),o&&(clearInterval(o),o=null)}startFetch(){o=setInterval(()=>{this.getMessages()},r)}cleanup(){clearInterval(o),o=null}getMessages(){a&&a.messages.list({limit:20,to:"+14122148476"}).then(e=>{console.log("TWILIO CALLED"),e.forEach(this.processMessage)},e=>console.log)}processMessage(e){e&&e.sid&&(s.startsWith(e.sid,"MM")?a.messages(e.sid).media.list({limit:10}).then(i=>i.forEach(i=>{a.messages(e.sid).media(i.sid).fetch().then(i=>{const a=i.uri,o=(l.mime(i.contentType)[0].ext,"https://api.twilio.com"+a.replace(".json",""));t.SaveMedia(o,s.isEmpty(e.body)?null:e.body,e.sid,e.dateUpdated)},e=>console.log)}),e=>console.log):t.SaveMedia(null,s.isEmpty(e.body)?null:e.body,e.sid,e.dateUpdated))}}exports.Twilio=new n;
},{"../main":"ZCfc"}],"ZCfc":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./helpers/dock"),r=require("./helpers/tray"),o=require("./helpers/screen"),i=e(require("lodash")),n=require("node-fetch"),l=require("url"),s=require("./helpers/annotator"),a=require("./helpers/ipc-helper"),p=require("../api/server"),c=require("./helpers/splash"),u=require("./helpers/menu"),h=require("./helpers/twilio"),d=require("electron"),{BrowserWindow:m,app:f,Menu:w,ipcMain:q,dialog:y}=d,P=require("electron-is-dev"),{resolve:T}=require("app-root-path"),v=require("html-to-rtf"),g=e(require("fs"));let b;async function x(e,t,r,o){const i={mediaUrl:e,text:t,sid:r,modified:o},l=`http://localhost:${exports.API_PORT}/api/mms/`;n(l,{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(console.log,console.log)}exports.API_PORT=null,exports.EnableTwilio=!0,f.on("ready",async()=>{t.BuildMenu(),f.setName("Element");const e=c.GetSplashWindow(),i=d.screen.getPrimaryDisplay().size;b=new m({title:"Element",width:i.width,height:i.height-22,show:!1,transparent:!0,resizable:!1,fullscreenable:!1,titleBarStyle:"hidden",thickFrame:!1,webPreferences:{webSecurity:!1,scrollBounce:!0,nodeIntegration:!1,preload:a.GetIpcFileFixUrl()}});const n=u.GetApplictaionMenu();w.setApplicationMenu(n),r.BuildTray(b),b.once("ready-to-show",()=>{setTimeout(()=>{e.destroy(),setTimeout(()=>{b.show()},30)},2e3),exports.EnableTwilio&&(h.Twilio.initialize(),h.Twilio.startFetch())}),b.on("move",o.onMovedDebounced.bind(this,b));const q=l.format({pathname:T("app/renderer/.parcel/production/index.html"),protocol:"file:",slashes:!0}),y=P?"http://localhost:1124":q;b.setMenu(null),b.loadURL(y),d.ipcMain.on("launch-annotator",()=>{s.BuildAnnotator()});const v=await p.GetAPIServer();exports.API_PORT=v.API_PORT,b.API_PORT=v.API_PORT}),f.on("window-all-closed",()=>{console.log("App Quit"),f.quit()}),q.on("export-composition",(e,t)=>{if(!i.isEmpty(t)){const e={title:"Save Composition As",filters:[{name:"Rich Text Format",extensions:["rtf"]}]};y.showSaveDialog(e,e=>{g.writeFile(e,v.convertHtmlToRtf(t),t=>{if(t)return alert("An error ocurred updating the file"+t.message),void console.log(t);b.webContents.send("composition-saved",e),console.log("The file has been succesfully saved")})})}}),exports.SaveMedia=x;
},{"./helpers/dock":"bzVR","./helpers/tray":"PTX7","./helpers/screen":"qH2W","./helpers/annotator":"06rE","./helpers/ipc-helper":"jrzg","../api/server":"exEY","./helpers/splash":"OBnq","./helpers/menu":"kWfh","./helpers/twilio":"PBYJ"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.js.map