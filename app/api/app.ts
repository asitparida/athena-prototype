const express = require('express');
const cors = require('cors');
import * as bodyParser from 'body-parser';
import { IStickyNote } from './api-types';
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('athena_db.json')
const db = low(adapter);

db.defaults({ notes: [] })
    .write();
// db.set('notes', []).write();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function GetQueryParams(req: any) {
    const params: any = {};
    if (req.query) {
        // tslint:disable-next-line:forin
        for (const prop in req.query) {
            params[prop] = req.query[prop];
        }
    }
    return params;
}
app.get('/api/meta/', (req, res) => {
    res.json({ data: 'AWESOME' });
});
app.post('/api/stickies/', (req, res) => {
    const sticky = req.body;
    const collection = db.defaults({ posts: [] }).get('notes');
    let notes = collection.value();
    if (!sticky.id) {
        sticky.id = `${Math.floor(Math.random() * 10e8)}`;
    } else {
        notes = notes.filter(note => note.id !== sticky.id);
    }
    db.set('notes', [].concat(...notes, sticky)).write();
    res.json({ data: sticky });
});
app.get('/api/stickies/unassigned', (req, res) => {
    const notes = db.get('notes')
        .filter({ assigned: false })
        .value();
    res.json({ data: notes });
});

export default app;
