'use strict';

const express = require('express');
const cors = require('cors');
// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();




app.options('/', cors());

app.get('/', cors(), (req, res) => {

    res.json({
        msg: 'Krissen er en fed homoseksuel bög, og team boner er nogle fede noobs'
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);