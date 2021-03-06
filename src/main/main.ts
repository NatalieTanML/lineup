/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import { app, ipcMain } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import Email from 'email/Email';
import { menubar } from 'menubar';
import path from 'path';
import 'regenerator-runtime/runtime';
import { resolveHtmlPath } from './util';
import EmailService from '../email';
import { Meetings, Preferences, Credential, Meeting } from '../data';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const APPLICATION_DIR = app.getPath('userData');

let inbox: EmailService | null = null;
const meetings = new Meetings();
const preferences = new Preferences();

const account = preferences.getCredential();
if (account !== undefined) {
  inbox = new EmailService(account.email, account.password);
}

ipcMain.on('check-login-status', async (event) => {
  event.returnValue = preferences.getCredential() !== undefined;
});

ipcMain.on('auth-login', async (event, credential: Credential) => {
  if (preferences.getCredential() === undefined) {
    preferences.updateCredential(credential.email, credential.password);
    inbox = new EmailService(credential.email, credential.password);
  }
  event.returnValue = true;

  if (inbox !== null) {
    const lastQueriedAt = preferences.getLastQueryDateTime();
    let emails: Email[] = [];
    if (lastQueriedAt === undefined) {
      const latestSequence = await inbox?.getLatestInboxSequence();
      emails = await inbox?.fetchEmailInRange(
        latestSequence === 0 ? 0 : 1,
        latestSequence
      );
    } else {
      emails = await inbox.fetchEmailSince(lastQueriedAt);
    }

    preferences.updateLastQueryDateTime(new Date());

    const re = /https:\/\/(.*\.)?zoom.us\/j\/[0-9]+(\?pwd=[a-zA-Z0-9]+)?/;

    // eslint-disable-next-line no-restricted-syntax
    for (const email of emails) {
      if (email.message?.search(re)) {
        const url = email.message?.match(re);
        let urll = '';
        if (url) {
          urll = url[0].toString();
        }
        meetings.addMeeting(
          new Meeting(
            email.subject,
            email.date,
            email.subject,
            email.from,
            urll
          )
        );
      }
    }
    event.sender.send('new-updates', 'fetch');

    inbox.listenForUpdates(async (email) => {
      if (email.message?.search(re)) {
        const url = email.message?.match(re);
        let urll = '';
        if (url) {
          urll = url[0].toString();
        }
        meetings.addMeeting(
          new Meeting(
            email.subject,
            email.date,
            email.subject,
            email.from,
            urll
          )
        );
      }
      event.sender.send('new-updates', 'fetch');
    });
  }
});

ipcMain.on('get-meetings', (event) => {
  event.returnValue = meetings.getMeetings();
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createMenubar = async (applicationDir: string) => {
  if (isDevelopment) {
    await installExtensions();
  }
  const mb = menubar({
    index: resolveHtmlPath('index.html'),
    tooltip: 'Lineup',
    icon: getAssetPath(path.join('icons', '16x16.png')),
    showDockIcon: false,
    browserWindow: {
      transparent: false,
      alwaysOnTop: false,
      width: 550,
      height: 600,
      skipTaskbar: true,
      resizable: !app.isPackaged,
      webPreferences: {
        devTools: !app.isPackaged,
        preload: path.join(__dirname, 'preload.js'),
      },
    },
  });

  mb.on('ready', () => {
    console.log('Menubar app is ready.');
  });

  mb.on('after-create-window', () => {
    if (process.platform === 'darwin') {
      app.dock.hide();
    }
    mb.window?.webContents.send('init-menubar', {
      applicationDir,
    });
  });

  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  inbox?.disconnect();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createMenubar(APPLICATION_DIR);
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      // if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
