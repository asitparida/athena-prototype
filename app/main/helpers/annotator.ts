import { BrowserWindow } from 'electron';
import { format } from 'url';
import { GetIpcFileFixUrl } from './ipc-helper';
const { resolve } = require('app-root-path');
const isDev = require('electron-is-dev');

export function BuildAnnotator() {
    const window = new BrowserWindow({
        // parent: mainWindow,
        width: 300,
        height: 200,
        show: false,
        transparent: true,
        // resizable: false,
        fullscreenable: false,
        vibrancy: 'ultra-dark',
        alwaysOnTop: true,
        skipTaskbar: true,
        frame: false,
        webPreferences: {
            webSecurity: false,
            scrollBounce: true,
            nodeIntegration: false,
            preload: GetIpcFileFixUrl()
        }
    })
    window.once('ready-to-show', () => {
        window.show();
        window.focus();
        if (isDev && false) { window.webContents.openDevTools() }
    });

    const devPath = 'http://localhost:1125'
    const prodPath = format({
        pathname: resolve('app/widgets/annotator/.parcel/production/index.html'),
        protocol: 'file:',
        slashes: true
    })
    const url = isDev ? devPath : prodPath

    window.setMenu(null)
    window.loadURL(url)
}