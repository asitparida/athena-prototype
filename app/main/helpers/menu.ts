import { MenuItem, Menu, app,  BrowserWindow, dialog } from 'electron';

export function GetApplictaionMenu() {
    const template = [
        {
            label: app.getName(), submenu: [
                { label: 'New', accelerator: 'Command+R', click() { console.log('go!') } },
                { label: 'Save', click() { console.log('go!') } },
                { label: 'Sync', click() { console.log('go!') } },
                { type: 'separator' },
                { role: 'Quit' }
            ]
        },
        {
            label: 'View',
            submenu: [{
                label: 'Reload',
                click: () => {
                    app.relaunch();
                    app.exit();
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            }, {
                type: 'separator'
            }, {
                label: 'App Menu Demo',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        const options = {
                            type: 'info',
                            title: 'Application Menu Demo',
                            buttons: ['Ok'],
                            message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
                        }
                        dialog.showMessageBox(focusedWindow, options)
                    }
                }
            }]
        },
        {
            label: 'Window',
            submenu: [{
                label: 'Close',
                click: (item, focusedWindow: BrowserWindow) => {
                    if (focusedWindow) {
                        // on reload, start fresh and close any old
                        // open secondary windows
                        if (focusedWindow.id === 1) {
                          BrowserWindow.getAllWindows().forEach(win => {
                            if (win.id > 1) {
                                 win.close()
                            }
                          })
                        }
                        focusedWindow.close();
                      }
                }
            }]
        }
    ];
    return Menu.buildFromTemplate(template as any);
}