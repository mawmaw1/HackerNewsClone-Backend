const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password:  { type: String, required: true },
    karmaPoints: Number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

module.exports = mongoose.model('User', userSchema)