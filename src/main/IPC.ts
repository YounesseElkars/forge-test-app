import { ipcMain } from 'electron';
import WebViewManager from './WebViewManager';

export default class IPCManager {
  WebViewManager: WebViewManager;

  constructor(WebViewManager: WebViewManager) {
    this.WebViewManager = WebViewManager;
    this.initializeIPC();
  }

 

  private initializeIPC(): void {
    ipcMain.on('open-base-window', (_event, params: string) => {
      this.WebViewManager.addWebView(params);
    });

    ipcMain.on('show-base-window', (_event, params: string) => {
      this.WebViewManager.showWebView(params);
    });

    ipcMain.on('hide-base-window', (_event, params: string) => {
      this.WebViewManager.hideWebView(params);
    });

    ipcMain.on('remove-base-window', (_event, _params: string) => {
      this.WebViewManager.removeAllWebViews();
    });

    ipcMain.on('change-url-base-window', (_event, params: string) => {
      this.WebViewManager.changeURL(params);
    });

    ipcMain.on('refresh-view', (_event, params: string) => {
      this.WebViewManager.refreshView(params);
    });
  }
}
