import { BuildMenu } from './helpers/dock';
import { BuildTray } from './helpers/tray';
import { GetExternalDisplay, onMovedDebounced } from './helpers/screen';
import * as _ from 'lodash';

import { format } from 'url';
import { BuildAnnotator } from './helpers/annotator';
import { GetIpcFileFixUrl } from './helpers/ipc-helper';
import { GetAPIServer } from '../api/server';
import { GetSplashWindow } from './helpers/splash';
const electron = require('electron');
const { BrowserWindow, app } = electron;
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path')

app.on('ready', async () => {
    BuildMenu();
    app.setName('Project Athena');
    const splashWindow = GetSplashWindow();
    const size = electron.screen.getPrimaryDisplay().size;
    const mainWindow = new BrowserWindow({
        title: 'Project Athena',
        width: size.width,
        height: size.height - 22,
        show: false,
        transparent: true,
        resizable: false,
        fullscreenable: false,
        titleBarStyle: 'hidden',
        vibrancy: 'ultra-dark',
        webPreferences: {
            webSecurity: false,
            scrollBounce: true,
            nodeIntegration: false,
            preload: GetIpcFileFixUrl()
        }
    })
    BuildTray(mainWindow);
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashWindow.destroy();
            setTimeout(() => {
                mainWindow.show();
            }, 30);
        }, 2000);
        if (isDev && false) { mainWindow.webContents.openDevTools() }
    });
    mainWindow.on('move', onMovedDebounced.bind(this, mainWindow))

    const devPath = 'http://localhost:1124'
    const prodPath = format({
        pathname: resolve('app/renderer/.parcel/production/index.html'),
        protocol: 'file:',
        slashes: true
    })
    const url = isDev ? devPath : prodPath

    mainWindow.setMenu(null)
    mainWindow.loadURL(url)
    electron.ipcMain.on('launch-annotator', () => {
        BuildAnnotator();
    });
    const server: any = await GetAPIServer();
    // tslint:disable-next-line:no-string-literal
    mainWindow['API_PORT'] = server.API_PORT;
})
app.on('window-all-closed', app.quit)
