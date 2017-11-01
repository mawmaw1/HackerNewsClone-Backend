const LocalStrategy = require('passport-local').Strategy
const User = require('./models/userModel')

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (user.password != password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                })
                .catch(err => done(err))
        }
    ));
}