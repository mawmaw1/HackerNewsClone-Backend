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
    console.log(req.session)
    console.log(req.sessionID)
    res.end('ok')
})

router.get('/ping', (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.json(req.user)
    }
    res.end('pong')
})

router.post('/post', (req, res) => {

    console.log(req.rawBody)
    
    postCtrl.createPost(req.rawBody)
        .then(post => {
            return res.end('Post was created successfully!')
        })
        .catch(err => {
            console.log(err)
            return res.status(500).end('Error when creating post!', err);
        })
})

router.post('/posts', (req, res) => {
    postCtrl.getPosts(req.rawBody.skip, req.rawBody.limit)
        .then(posts => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(posts, null, 2));
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router