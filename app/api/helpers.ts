import { app as ElectronApp } from 'electron';
import * as fs from 'fs';
export function getLocalDBFile() {
    const filePath = ElectronApp.getPath('userData') + '/elements.json';
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}));
    }
    return filePath;
}
