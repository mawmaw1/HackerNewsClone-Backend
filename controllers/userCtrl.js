const User = require('../models/userModel')

exports.createUser = (username, password) => {
    const user = new User({
        username,
        password,
        karma: 1,
        createdAt: new Date()
    })
    return user.save()
}

exports.getUser = (userId) => {
    return User.findById(userId).where('deletedAt').equals(null)
}

exports.deleteUser = (userId) => {
    return User.findOneAndUpdate({ '_id': userId }, { $set: { deletedAt: new Date() } }, { new: true })
}