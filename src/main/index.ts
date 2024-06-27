import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { screen } from 'electron';
import path from 'path';
import WebViewManager from './WebViewManager';
 
process.env.VITE_PUBLIC = path.join(__dirname, '../renderer/public');

class MainApp {
  private win: BrowserWindow | null = null;
  WebViewManager: WebViewManager | null = null;
  constructor() {
    app.whenReady().then(this.createWindow.bind(this));
    app.on('activate', this.onActivate.bind(this));
    this.initializeIPC();
  }

  initSkeleton(win) {
    this.WebViewManager = new WebViewManager(win, { x: 400, y: 30, width: 400, height: 600 });
  }

  private createWindow(): void {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    this.win = new BrowserWindow({
      width,
      height,
      frame: true,
      fullscreen: false,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        devTools: true,
        nodeIntegration: true,
      },
    });

    this.initSkeleton(this.win);

    this.win.on('ready-to-show', async () => {
      this.win?.show();
     });

    this.win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.win.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
      this.win.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }

  private onActivate(): void {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }

  private initializeIPC(): void {
    ipcMain.on('open-base-window', (_event, params: string) => {
      this.WebViewManager?.addWebView(params);
    });

    ipcMain.on('show-base-window', (_event, params: string) => {
      this.WebViewManager?.showWebView(params);
    });

    ipcMain.on('hide-base-window', (_event, params: string) => {
      this.WebViewManager?.hideWebView(params);
    });

    ipcMain.on('remove-base-window', (_event, _params: string) => {
      this.WebViewManager?.removeAllWebViews();
    });

    ipcMain.on('change-url-base-window', (_event, params: string) => {
      this.WebViewManager?.changeURL(params);
    });

    ipcMain.on('refresh-view', (_event, params: string) => {
      this.WebViewManager?.refreshView(params);
    });
  }
}

new MainApp();
