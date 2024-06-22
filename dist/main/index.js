"use strict";
;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, n = new Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "e52e9382-aeb2-4e5c-ac8a-c72d30380e64", e._sentryDebugIdIdentifier = "sentry-dbid-e52e9382-aeb2-4e5c-ac8a-c72d30380e64");
  } catch (e2) {
  }
}();
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/icon.png");
var _global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
_global.SENTRY_RELEASE = { id: "8d7bd1863f1e867e606d6b4a2fe2dc9a211c23cf" };
const { localStorage } = require("electron-browser-storage");
process.env.VITE_PUBLIC = path.join(__dirname, "../renderer/public");
let win;
function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new electron.BrowserWindow({
    width,
    height,
    frame: true,
    fullscreen: false,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      devTools: true,
      nodeIntegration: true
    }
  });
  win.on("ready-to-show", async () => {
    win?.show();
    await localStorage.setItem("favorite_number", 12);
  });
  win.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.ipcMain.on("open-base-window", () => {
  const basewin = new electron.BaseWindow({ width: 800, height: 600 });
  const leftView = new electron.WebContentsView();
  leftView.webContents.loadURL("https://electronjs.org");
  basewin.contentView.addChildView(leftView);
  const rightView = new electron.WebContentsView();
  rightView.webContents.loadURL("https://github.com/electron/electron");
  basewin.contentView.addChildView(rightView);
  leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 });
  rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 });
});
//# sourceMappingURL=index.js.map
