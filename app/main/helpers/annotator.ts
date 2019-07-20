import { BrowserWindow } from 'electron';
import { format } from 'url';
import { GetIpcFileFixUrl } from './ipc-helper';
import { API_PORT } from '../main';
const { resolve } = require('app-root-path');
const isDev = require('electron-is-dev');

export function BuildAnnotator() {
    const window = new BrowserWindow({
        width: 300,
        height: 200,
        show: false,
        transparent: false,
        fullscreenable: false,
        minimizable: false,
        maximizable: false,
        vibrancy: 'light',
        alwaysOnTop: true,
        skipTaskbar: false,
        frame: true,
        webPreferences: {
            webSecurity: false,
            scrollBounce: true,
            nodeIntegration: false,
            preload: GetIpcFileFixUrl()
        }
    })
    // tslint:disable:no-string-literal
    window['API_PORT'] = API_PORT;
    window.once('ready-to-show', () => {
        window.setMaximizable(false);
        window.setMinimizable(false);
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
    window.loadURL(url);
    return window;
}
