const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  start: () => {
    require('./payload.js');
  }
});
