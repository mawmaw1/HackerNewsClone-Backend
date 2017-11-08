'use strict'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const metrics = require('./metrics')
const api = require('./router')
// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// mongoose.connect('mongodb://localhost:27017/hnc', { useMongoClient: true })
// mongoose.connect('mongodb://shared:kukenrbra@ds139585.mlab.com:39585/hnc', { useMongoClient: true });
mongoose.connect('mongodb://shared:kukenrbra@139.59.211.36:27017/hnc', { useMongoClient: true });
mongoose.Promise = global.Promise

// App
const app = express();

app.use((req, res, next) => {
    //metric for http request ms
    res.locals.startEpoch = Date.now()
    next()
})

require('./passConf')(passport)

const corsOptions = {
    origin: true
}

app.use(cors(corsOptions))
app.use(morgan('short'))
app.use(cookieParser())

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = JSON.parse(buf.toString(encoding || 'utf8'));
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));
app.use(express.static('./public'))

app.use(session({
    secret: 'meownus',
    resave: true,
    saveUninitialized: true,
  }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    console.log(req.user)
    console.log(req.session, req.sessionID)
    res.json({
        msg: 'Hej fra backend... klokken er ' + new Date().toLocaleString()
    })
})

app.use(metrics.router)
app.use(api)

// metric for httprequest end
app.use((req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch
    metrics.httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(responseTimeInMs)
    next()
})





app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
