const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  run: () => {
    require('./payload.js');
  }
});
