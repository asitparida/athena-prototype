import { BrowserWindow } from 'electron';
import { format } from 'url';
const { resolve } = require('app-root-path')

let splashWindow;

export function GetSplashWindow() {
    splashWindow = new BrowserWindow({
        title: 'Element',
        width: 300,
        height: 300,
        show: true,
        transparent: true,
        resizable: false,
        fullscreenable: false,
        titleBarStyle: 'customButtonsOnHover',
        maximizable: false,
        minimizable: false,
        closable: false,
        alwaysOnTop: true,
        frame: false
    });
    const prodPath = format({
        pathname: resolve('build/splash.html'),
        protocol: 'file:',
        slashes: true
    })
    const url = prodPath
    splashWindow.loadURL(url);
    return splashWindow;
}
