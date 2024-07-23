import { BrowserWindow, Rectangle, WebContentsView } from 'electron';

export default class Skeleton {
  private win: BrowserWindow;
  view: WebContentsView | null = null;
  url;
  bounds;

  constructor(win: BrowserWindow, bounds: Rectangle) {
    this.win = win;
    this.url = 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-editable-green-loading-bar-screen-png-svg-cdr-png-image_6023447.jpg';
    this.bounds = bounds;
    this.createSkeleton();
  }

  private createSkeleton() {
    this.view = new WebContentsView();
    this.view.webContents.loadURL(this.url);
    this.view.setBounds(this.bounds);
    this.view.setVisible(false);
  }

  showSkeleton(): void {
    if (this.view) {
      this.view.setVisible(true);
      this.win.contentView.addChildView(this.view);
    }
  }

  hideSkeleton(): void {
    if (this.view) {
      this.view.setVisible(false);
    }
  }
}
