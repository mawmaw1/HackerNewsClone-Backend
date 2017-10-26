'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const morgan = require('morgan')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

mongoose.connect('mongodb://localhost:27017/hackernews', { useMongoClient: true });
mongoose.Promise = global.Promise

// App
const app = express();

app.use(cors());
app.use(morgan('short'))

app.get('/', (req, res) => {
    res.json({
        msg: 'Hej fra backend... klokken er ' + new Date().toLocaleString()
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
