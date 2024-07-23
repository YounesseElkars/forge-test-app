import { app, shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { screen } from 'electron';
import path from 'path';
import { Rectangle } from 'electron';
import IPCManager from './IPC';
import WebViewManager from './WebViewManager';

const defaultBounds = { x: 400, y: 60, width: 800, height: 700 } as Rectangle;
process.env.VITE_PUBLIC = path.join(__dirname, '../renderer/public');

export default class MainBrowserWindow {
  win;

  constructor() {
    app.whenReady().then(this.createWindow.bind(this));
    app.on('activate', this.onActivate.bind(this));
  }

  private createWindow(): void {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    this.win = new BrowserWindow({
      width,
      height,
      frame: true,
      fullscreen: false,
      autoHideMenuBar: true,
      show: false,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        devTools: true,
        nodeIntegration: true,
      },
    });

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

    const webViewManager = new WebViewManager(this.win, defaultBounds);

    new IPCManager(webViewManager);
  }

  private onActivate(): void {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }
}
