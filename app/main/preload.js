const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    async goBack() {
      ipcRenderer.send('goBack');
    },
    async goForward() {
      ipcRenderer.send('goForward');
    },
    async canGoBackOrForward(func) {
      ipcRenderer.send('canGoBackOrForward');
      ipcRenderer.once('canGoResult', (event, data) => {
        func(data);
      });
    },
    async generateApi() {
      ipcRenderer.send('generateApi');
    },
  },
});
