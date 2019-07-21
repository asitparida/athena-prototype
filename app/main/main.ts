import { BuildMenu } from './helpers/dock';
import { BuildTray } from './helpers/tray';
import { onMovedDebounced } from './helpers/screen';
import * as _ from 'lodash';
const fetch = require('node-fetch');
import { format } from 'url';
import { BuildAnnotator } from './helpers/annotator';
import { GetIpcFileFixUrl } from './helpers/ipc-helper';
import { GetAPIServer } from '../api/server';
import { GetSplashWindow } from './helpers/splash';
import { GetApplictaionMenu } from './helpers/menu';
import { Twilio } from './helpers/twilio';
const electron = require('electron');
const { BrowserWindow, app, Menu, ipcMain, dialog } = electron;
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path');
const htmlToRtf = require('html-to-rtf');
import * as fs from 'fs';

export let API_PORT = null;
export const EnableTwilio = false;
let mainWindow;

app.on('ready', async () => {
    BuildMenu();
    app.setName('Element');
    const splashWindow = GetSplashWindow();
    const size = electron.screen.getPrimaryDisplay().size;
    mainWindow = new BrowserWindow({
        title: 'Element',
        width: size.width,
        height: size.height - 22,
        show: false,
        transparent: true,
        resizable: false,
        fullscreenable: false,
        titleBarStyle: 'hidden',
        thickFrame: false,
        webPreferences: {
            webSecurity: false,
            scrollBounce: true,
            nodeIntegration: false,
            preload: GetIpcFileFixUrl()
        }
    });
    const menu = GetApplictaionMenu();
    Menu.setApplicationMenu(menu);
    BuildTray(mainWindow);
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashWindow.destroy();
            setTimeout(() => {
                mainWindow.show();
            }, 30);
        }, 2000);
        if (EnableTwilio) {
            Twilio.initialize();
            Twilio.startFetch();
        }
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
    API_PORT = server.API_PORT;
    // tslint:disable-next-line:no-string-literal
    mainWindow['API_PORT'] = server.API_PORT;
})
app.on('window-all-closed', () => {
    console.log('App Quit');
    app.quit();
})
ipcMain.on('export-composition', (event, arg) => {
    if (!_.isEmpty(arg)) {
        const options = {
            title: 'Save Composition As',
            filters: [
                { name: 'Rich Text Format', extensions: ['rtf'] }
            ]
        };
        dialog.showSaveDialog(options, (fileName) => {
            fs.writeFile(fileName, htmlToRtf.convertHtmlToRtf(arg), (err) => {
                if (err) {
                    alert("An error ocurred updating the file" + err.message);
                    console.log(err);
                    return;
                }
                console.log("The file has been succesfully saved");
            });
        });
    }
})

export async function SaveMedia(mediaUrl, text, sid, modified) {
    const data = {
        mediaUrl,
        text,
        sid,
        modified
    };
    const mmsPostUrl = `http://localhost:${API_PORT}/api/mms/`;
    fetch(mmsPostUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(() => {
        // mainWindow.webContents.send('new-mms-data');
    }, console.log)
}
