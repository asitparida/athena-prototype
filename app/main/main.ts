import { BuildMenu } from "./dock";
import { BuildTray } from "./tray";

const { format } = require('url')
const electron = require('electron');
const { BrowserWindow, app } = electron;
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path')

app.on('ready', async () => {
    BuildMenu();
    app.setName('Athena Prototype');
    const size = electron.screen.getPrimaryDisplay().size
    const mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        show: false,
        transparent: true,
        resizable: false,
        fullscreenable: false,
        titleBarStyle: 'hidden',
        vibrancy: 'ultra-dark',
        webPreferences: {
            webSecurity: false
        }
    })
    BuildTray(mainWindow);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        if (isDev && false) { mainWindow.webContents.openDevTools() }
    })

    const devPath = 'http://localhost:1124'
    const prodPath = format({
        pathname: resolve('app/renderer/.parcel/production/index.html'),
        protocol: 'file:',
        slashes: true
    })
    const url = isDev ? devPath : prodPath

    mainWindow.setMenu(null)
    mainWindow.loadURL(url)
})
app.on('window-all-closed', app.quit)
