const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  auth: {
    login(email, password) {
      return ipcRenderer.sendSync('auth-login', {
        email,
        password,
      });
    },
  },
  meetings: {
    get() {
      return ipcRenderer.sendSync('get-meetings');
    },
  },
  updates: {
    listen(func) {
      ipcRenderer.on('new-updates', (event, ...args) => func(...args));
    },
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
