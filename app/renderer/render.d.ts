export interface IIpcRenderer {
  myPing(): void;
  goBack(): void;
  goForward(): void;
  canGoBackOrForward(setData: React.Dispatch<React.SetStateAction<any>>): void;
  generateApi(): void;
}
export interface IElectronAPI {
  ipcRenderer: IIpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
declare module '*.svg' {
  const content: any;
  export default content;
}
