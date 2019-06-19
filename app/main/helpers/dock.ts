import { app, Menu} from 'electron';
export function BuildMenu() {
    const dockMenu = Menu.buildFromTemplate([
        { label: 'All Clips' },
        {
            label: 'Workspace',
            submenu: [
                { label: 'Workspace #1' },
                { label: 'Workspace #2' },
                { label: 'Workspace #3' }
            ]
        }
    ])
    app.dock.setMenu(dockMenu);
    app.dock.show();
}