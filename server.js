'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/hackernews');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'Hej fra backend... klokken er ' + new Date().toLocaleString()
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
