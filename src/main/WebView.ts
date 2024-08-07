import { BrowserWindow, WebContentsView } from 'electron';
import Skeleton from './Skeleton';
import { Rectangle } from 'electron';
import WebViewManager from './WebViewManager';

export default class WebView {
  private win: BrowserWindow;
  view: WebContentsView | null = null;
  url;
  bounds;

  constructor(win: BrowserWindow, url: string, bounds: Rectangle, skeleton: Skeleton) {
    this.win = win;
    this.url = url;
    this.bounds = bounds;
    this.createWebView(skeleton);
  }

  createWebView(skeleton: Skeleton) {
    this.view = new WebContentsView();
    this.view.webContents.loadURL(this.url);
    this.win.contentView.addChildView(this.view);
    this.view.setBounds(this.bounds);
    this.view.webContents.on('did-start-navigation', () => {
      if (this.url == WebViewManager.browserOnTop) {
        skeleton.showSkeleton();
      }
    });
    this.view.webContents.on('did-stop-loading', () => {
      if (this.url == WebViewManager.browserOnTop) {
        skeleton.hideSkeleton();
      }
    });
  }

  doesURLIncludeSubstring(substring): boolean {
    if (this.view) {
      return this.url.includes(substring);
    } else {
      return false;
    }
  }

  showWebView(): void {
    if (this.view) {
      this.view.setVisible(true);
      this.win.contentView.addChildView(this.view);
    }
  }

  hideWebView(): void {
    if (this.view) {
      this.view.setVisible(false);
    }
  }

  removeWebView(): void {
    if (this.view) {
      // this.view.webContents.close();
      this.win.contentView.removeChildView(this.view);
      this.view.webContents.close();
    }
  }
  changeURL() {
    if (this.view) {
      this.view.webContents.loadURL('https://google.com');
    }
  }
  refreshView() {
    if (this.view) {
      this.view.webContents.loadURL(this.url);
    }
  }

  getViewID(): number | undefined {
    return this.view?.webContents.id;
  }
}
