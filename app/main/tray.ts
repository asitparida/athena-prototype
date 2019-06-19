import { nativeImage, Tray, Menu, app, BrowserWindow } from 'electron';
import logo from './assets/network.png';
let tray: Tray = null;
export function BuildTray(win: BrowserWindow) {
    const image = nativeImage.createFromPath(__dirname + logo);
    image.resize({ width: 30, height: 30 });
    tray = new Tray(image);
    tray.setImage(image);
    const onClick = () => {
        const isVisible = win.isFocused();
        if (!isVisible) {
            win.focus();
        }
    };
    const contextMenu = Menu.buildFromTemplate([
        { label: 'All Clips', click: onClick },
        { label: 'Workspace #1', click: onClick  },
        { label: 'Workspace #2', click: onClick  },
        { label: 'Workspace #3', click: onClick  }
    ])
    tray.setContextMenu(contextMenu)
}