// import { init } from '@sentry/electron/renderer';
import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import '@sentry/electron/preload';
import { init } from '@sentry/electron/renderer';
import '@sentry/electron/preload';

init({ dsn: 'https://c3ee844c513692f73dd13d9822a0f00e@o4507300165713920.ingest.de.sentry.io/4507300168269904', debug: true, attachStacktrace: true });

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
