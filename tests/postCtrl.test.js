const postCtrl = require('../controllers/postCtrl')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hackernews', { useMongoClient: true });
mongoose.Promise = global.Promise

test('create post', (done) => {
    postCtrl.createPost('post title', 'post content')
        .then(post => {
            expect(post).toBeTruthy()
            return postCtrl.getPost(post._id)
        })
        .then(post => {
            expect(post).toBeTruthy()
            done()
        })
        .catch(fail)
})

test('get posts', (done) => {
    postCtrl.createPost('post title', 'post content')
        .then(post => {
            expect(post).toBeTruthy()
            return postCtrl.getPosts()
        })
        .then(posts => {
            expect(posts.length).toBeGreaterThan(0)
            done()
        })
        .catch(err => {
            console.log(err)
            expect(err).toBeNull()
        })
})