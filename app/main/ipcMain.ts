import { BrowserWindow, ipcMain } from 'electron';

export default function initIpcMain(win: BrowserWindow) {
  if (!win) {
    throw new Error('"mainWindow" is not defined');
  }
  ipcMain.on('goBack', (event) => {
    win.webContents.goBack();
    event.sender.send('canGoBack', {
      back: win.webContents.canGoBack(),
      forward: win.webContents.canGoForward(),
    });
  });

  ipcMain.on('goForward', (event) => {
    win.webContents.goForward();
    event.sender.send('canGoForward', {
      back: win.webContents.canGoBack(),
      forward: win.webContents.canGoForward(),
    });
  });

  ipcMain.on('canGoBackOrForward', (event) => {
    event.sender.send('canGoResult', {
      back: win.webContents.canGoBack(),
      forward: win.webContents.canGoForward(),
    });
  });
}
