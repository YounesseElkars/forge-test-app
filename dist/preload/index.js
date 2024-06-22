"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
require("@sentry/electron/preload");
const renderer = require("@sentry/electron/renderer");
renderer.init({ dsn: "https://c3ee844c513692f73dd13d9822a0f00e@o4507300165713920.ingest.de.sentry.io/4507300168269904", debug: true, attachStacktrace: true });
const api = {};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
