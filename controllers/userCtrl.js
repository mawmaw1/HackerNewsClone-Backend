const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.createUser = (username, plainPassword) => {
    const password = bcrypt.hashSync(plainPassword, 10)

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