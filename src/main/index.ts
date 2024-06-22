import { app, shell, BrowserWindow, ipcMain, WebContentsView, BaseWindow } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { screen } from 'electron';
import path from 'path';
const { localStorage } = require('electron-browser-storage');

process.env.VITE_PUBLIC = path.join(__dirname, '../renderer/public');

let win: BrowserWindow;

function createWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: width,
    height: height,
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

  win.on('ready-to-show', async () => {
    win?.show();
    await localStorage.setItem('favorite_number', 12);
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('open-base-window', () => {
  const basewin = new BaseWindow({ width: 800, height: 600 });

  const leftView = new WebContentsView();
  leftView.webContents.loadURL('https://electronjs.org');
  basewin.contentView.addChildView(leftView);

  const rightView = new WebContentsView();
  rightView.webContents.loadURL('https://github.com/electron/electron');
  basewin.contentView.addChildView(rightView);

  leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 });
  rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 });
});
