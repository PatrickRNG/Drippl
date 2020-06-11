const { app, BrowserWindow, Tray, ipcMain } = require('electron');

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null;
let window = null;

const createTray = () => {
  tray = new Tray(path.join(__dirname, 'assets', 'drop.png'));
  tray.on('click', function (event) {
    toggleWindow();
  });
};

app.on('ready', () => {
  createWindow();
  createTray();
});

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: { nodeIntegration: false, backgroundThrottling: false },
  });

  // Load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });
  window.loadURL(startUrl);
  // window.webContents.openDevTools();

  // Emitted when the window is closed.
  window.on('closed', function () {
    window = null;
  });
};

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
};

ipcMain.on('show-window', () => {
  showWindow();
});
