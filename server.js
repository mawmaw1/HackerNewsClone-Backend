'use strict';

const express = require('express');
const cors = require('cors');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();




app.options('/', cors());

app.get('/', cors(), (req, res) => {

    res.json({
        msg: 'Hej fra backend... klokken er ' + new Date().toLocaleString()
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
