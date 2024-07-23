import { app, BrowserWindow, Rectangle } from 'electron';
import Skeleton from './Skeleton';
import WebView from './WebView';

export default class WebViewManager {
  webViewList: WebView[] = [];
  skeleton;
  win;
  bounds: Rectangle;
  static browserOnTop = '';

  constructor(win: BrowserWindow, bounds: Rectangle) {
    this.win = win;
    this.bounds = bounds;
    app.whenReady().then(this.createSkeleton.bind(this));
  }

  private createSkeleton() {
    this.skeleton = new Skeleton(this.win, this.bounds);
  }

  addWebView(params) {
    this.webViewList.push(new WebView(this.win, params, this.bounds, this.skeleton));
    WebViewManager.browserOnTop = params;
  }

  showWebView(params) {
    this.webViewList.find((webView) => {
      if (webView.doesURLIncludeSubstring(params)) {
        webView.showWebView();
        WebViewManager.browserOnTop = params;
      }
    });
  }
  hideWebView(params) {
    this.webViewList.find((webView) => {
      if (webView.doesURLIncludeSubstring(params)) {
        webView.hideWebView();
      }
    });
  }
  removeAllWebViews() {
    this.webViewList.map((webView) => {
      webView.removeWebView();
    });
  }
  changeURL(params) {
    this.webViewList.find((webView) => {
      if (webView.doesURLIncludeSubstring(params)) {
        webView.changeURL();
      }
    });
  }
  refreshView(params) {
    this.webViewList.find((webView) => {
      if (webView.doesURLIncludeSubstring(params)) {
        webView.refreshView();
      }
    });
  }
}
