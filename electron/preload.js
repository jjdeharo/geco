const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gecoAPI', {
  getAppVersion: () => ipcRenderer.invoke('geco:get-version'),
  setLanguage: (language) => {
    ipcRenderer.send('geco:set-language', language);
  },
});
