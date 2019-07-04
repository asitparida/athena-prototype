const express = require('express');
const cors = require('cors');
import * as bodyParser from 'body-parser';

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
    res.json({ data: 'AWESOME'});
});

export default app;
