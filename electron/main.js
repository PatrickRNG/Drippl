const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const positioner = require('electron-traywindow-positioner');
const path = require('path');
const url = require('url');
const { CronTime } = require('cron');
const { getCronTime } = require('./utils/timer');
const { createNotification } = require('./utils/notification');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null;
let window = null;
let job;

const showWindow = () => {
  positioner.position(window);
  window.show();
};

const toggleWindow = () => {
  if (window.isVisible()) return window.hide();
  return showWindow();
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, 'assets', 'drop.png'));
  tray.on('click', () => {
    toggleWindow();
  });
};

const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    width: 400,
    height: 800,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: { nodeIntegration: true, backgroundThrottling: false },
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
  window.webContents.openDevTools({ mode: 'detach' });

  // Emitted when the window is closed.
  window.on('closed', () => {
    window = null;
  });
};

app.on('ready', () => {
  createWindow();
  createTray();
  job = createNotification(getCronTime(), {
    title: 'Water',
    message: 'Time to drink water!',
  });
});

ipcMain.on('show-window', () => {
  showWindow();
});

ipcMain.on('config', (event, arg) => {
  const { notificationFrequency } = arg;
  const cronTime = getCronTime(notificationFrequency);
  // Update notification time config
  if (job) {
    job.setTime(new CronTime(cronTime));
    job.start();
  }
});
