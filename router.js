const express = require('express')
const router = express.Router()
const passport = require('passport')

const postCtrl = require('./controllers/postCtrl')
const commentCtrl = require('./controllers/commentCtrl')
const userCtrl = require('./controllers/userCtrl')

router.post('/register', (req, res) => {
    // userCtrl.createUser(req.body.username, req.body.password)
    //     .then(user => {
    //         return res.end('ok')
    //     })
    //     .catch(res.status(500).end('error'))
    console.log(req.body)
    res.end('bra kuk')
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.user)
    console.log(req.body)
    console.log(res.getHeaders())
    console.log(res.cookie())
    res.end('ok')
})

router.get('/ping', (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.json(req.user)
    }
    res.end('pong')
})

router.get('/posts', (req, res) => {
    switch (req.body.post_type) {
        case 'story':
            // her
        break
        case 'comment':
        break
        case 'poll':
        break
        case 'pollopt':
        break
        default:
            res.status(401).end('bad request')
    }
})

module.exports = router