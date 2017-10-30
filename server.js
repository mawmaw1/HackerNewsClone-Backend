'use strict'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const api = require('./router')
// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// mongoose.connect('mongodb://localhost:27017/hackernews', { useMongoClient: true })
mongoose.connect('mongodb://shared:kukenrbra@ds139585.mlab.com:39585/hnc', { useMongoClient: true });

mongoose.Promise = global.Promise

// App
const app = express();

require('./passConf')(passport, LocalStrategy)

app.use(cors())
app.use(morgan('short'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'meownus',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.json({
        msg: 'Hej fra backend... klokken er ' + new Date().toLocaleString()
    })
})

app.use(api)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
