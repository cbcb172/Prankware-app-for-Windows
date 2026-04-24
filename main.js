const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,           // ✅ locks fullscreen
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
