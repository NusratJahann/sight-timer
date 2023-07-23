// declaring all properties that does'nt exist on type Window
export {};

declare global {
  interface Window {
    settingsModal: any;
  }
}