import app from './app';
const helmet = require('helmet');
const compression = require('compression');

const net = require('net');
function GetAvailablePort(startingAt) {

    function GetNextAvailablePort(currentPort, cb) {
        const server = net.createServer()
        server.listen(currentPort, () => {
            server.once('close', () => {
                cb(currentPort)
            })
            server.close()
        })
        server.on('error', () => {
            GetNextAvailablePort(++currentPort, cb)
        })
    }

    return new Promise((resolve, reject) => {
        GetNextAvailablePort(startingAt, resolve)
    })
}

export async function GetAPIServer() {
    app.use(helmet()); // set well-known security-related HTTP headers
    app.use(compression());
    app.disable('x-powered-by');
    const port = await GetAvailablePort(1000);
    const server = app.listen(port, () =>
        console.log('Starting ExpressJS API server on Port 8081'));
    return { server: app, API_PORT: port };
}
