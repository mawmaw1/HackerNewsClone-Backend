const express = require('express')
const router = express.Router()
const postCtrl = require('./controllers/postCtrl')
const commentCtrl = require('./controllers/commentCtrl')
const userCtrl = require('./controllers/userCtrl')

router.post('/user', (req, res) => {
    userCtrl.createUser(req.body.username, req.body.password)
        .then(user => {
            return res.end('ok')
        })
        .catch(res.status(500).end('error'))        
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