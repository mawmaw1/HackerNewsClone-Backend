const userCtrl = require('../controllers/userCtrl')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hackernews', { useMongoClient: true });
mongoose.Promise = global.Promise

test('createUser', (done) => {
    const username = Math.random().toString(36);
    userCtrl.createUser(username, 'password123')
        .then(user => {
            expect(user.username).toBeTruthy()
            return userCtrl.getUser(user._id)
        })
        .then(user => {
            expect(user.username).toBeTruthy()
            done()
        })
        .catch(err => {
            console.log(err)
            expect(err).toBeNull()
        })
})