const express = require('express')
const router = express.Router()
const passport = require('passport')

const postCtrl = require('./controllers/postCtrl')
const commentCtrl = require('./controllers/commentCtrl')
const userCtrl = require('./controllers/userCtrl')

router.post('/register', (req, res) => {
    userCtrl.createUser(req.body.username, req.body.password)
        .then(user => {
            req.login(user, err => {
                if (err) return res.status(500).end('ikke bra')
                res.end('ok')
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).end('error')
        })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.end('ok')
})

router.get('/ping', (req, res) => {
    if (req.user) {
        res.json(req.user)
    }
    res.end('pong')
})

router.get('/post/:id', (req, res) =>{
    const id = req.params.id;
    var postRes = {
        post: {},
        comments: []
    }
    postCtrl.getPost(id)
        .then(post => {
            postRes.post = post
            return postCtrl.getCommentsForPost(post.hanesst_id)
        })
        .then(comments => {
            postRes.comments = comments
            res.json(postRes)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end('Error when getting post!', err);
        })
})

router.get('/comments/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    postCtrl.getCommentsForPost(id)
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end('Error when creating post!', err);
        })
})

router.post('/post', (req, res) => {
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
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).end('error')
        })
})

module.exports = router