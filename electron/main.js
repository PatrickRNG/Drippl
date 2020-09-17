/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Tray, ipcMain, Notification } = require('electron');
const positioner = require('electron-traywindow-positioner');
const path = require('path');
const url = require('url');
const { CronTime } = require('cron');
const { channels } = require('../src/shared/constants');
const { getCronTime } = require('./utils/timer');
const { startNotification } = require('./utils/notification');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null;
let window = null;
let job;

const showWindow = () => {
  positioner.position(window, tray.getBounds());
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

const setupNotification = () => {
  const notification = new Notification({
    title: 'Water',
    body: 'Time to drink water!',
    sound: true,
  });
  notification.addListener('click', showWindow);
  job = startNotification(getCronTime(), notification);
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
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });

  window.loadURL(startUrl);

  if (process.env.ELECTRON_START_URL) {
    window.webContents.openDevTools({ mode: 'detach' });
  }

  // Emitted when the window is closed.
  window.on('closed', () => {
    window = null;
  });
};

app.on('ready', () => {
  createWindow();
  createTray();
  setupNotification();
});

ipcMain.on('show-window', () => {
  showWindow();
});

ipcMain.on(channels.CONFIG, (event, arg) => {
  const { notificationFrequency } = arg;
  const cronTime = getCronTime(Number(notificationFrequency));
  // Update notification time config
  if (job && cronTime) {
    job.setTime(new CronTime(cronTime));
    job.start();
  }
});

ipcMain.on(channels.QUIT, () => {
  app.quit();
});
