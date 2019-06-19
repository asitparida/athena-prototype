export function GetIpcFileFixUrl() {
    const splits = __dirname.split('/');
    const file = splits.splice(0, splits.length - 2).join('/') + '/electron-ipc.js';
    return file;
}