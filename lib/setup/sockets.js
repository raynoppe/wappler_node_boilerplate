const fs = require('fs-extra');
const { basename, extname } = require('path');
const debug = require('debug')('server-connect:sockets');
const { isEmpty } = require('./util');

module.exports = function (server, appSession) {
    if (isEmpty('app/sockets')) return null;

    const io = require('socket.io')();
    const session = require('express-socket.io-session');

    io.use(session(appSession, { autoSave: true }));

    // user hooks
    if (fs.existsSync('extensions/server_connect/sockets')) {
        const entries = fs.readdirSync('extensions/server_connect/sockets', { withFileTypes: true });

        for (let entry of entries) {
            if (entry.isFile() && extname(entry.name) == '.js') {
                const hook = require(`../../extensions/server_connect/sockets/${entry.name}`);
                if (hook.handler) hook.handler(io);
                debug(`Custom sockets hook ${entry.name} loaded`);
            }
        }
    }

    parseSockets();

    function parseSockets(namespace = '') {
        const entries = fs.readdirSync('app/sockets' + namespace, { withFileTypes: true });

        io.of(namespace || '/').on('connection', async (socket) => {
            if (fs.existsSync(`app/sockets${namespace}/connect.json`)) {
                try {
                    const App = require('../core/app');
                    const app = new App(socket.request);
                    const action = await fs.readJSON(`app/sockets${namespace}/connect.json`);
                    app.socket = socket;
                    app.define(action, true);
                } catch (e) {
                    debug(`ERROR: ${e.message}`);
                    console.error(e);
                }
            }

            if (fs.existsSync(`app/sockets${namespace}/disconnect.json`)) {
                socket.on('disconnect', async (event) => {
                    try {
                        const App = require('../core/app');
                        const app = new App(socket.request);
                        const action = await fs.readJSON(`app/sockets${namespace}/disconnect.json`);
                        app.socket = socket;
                        app.define(action, true);
                    } catch (e) {
                        debug(`ERROR: ${e.message}`);
                        console.error(e);
                    }
                });
            }

            socket.onAny(async (event, params, cb) => {
                try {
                    const App = require('../core/app');
                    const app = new App(socket.request);
                    const action = await fs.readJSON(`app/sockets${namespace}/${event}.json`);
                    app.set('$_PARAM', params);
                    app.socket = socket;
                    await app.define(action, true);
                    if (typeof cb == 'function') cb(app.data);
                } catch (e) {
                    debug(`ERROR: ${e.message}`);
                    console.error(e);
                }
            });
        });

        for (let entry of entries) {
            if (entry.isDirectory()) {
                parseSockets(namespace + '/' + entry.name);
            }
        }
    }

    io.attach(server);

    return io;
};