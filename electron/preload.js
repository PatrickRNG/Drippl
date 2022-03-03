const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  message: {
    send: (channel, payload) => ipcRenderer.send(channel, payload),
    on: (channel, handler) => ipcRenderer.on(channel, handler),
    off: (channel, handler) => ipcRenderer.off(channel, handler),
    invoke: (channel, handler) => ipcRenderer.invoke(channel, handler),
  },
});
