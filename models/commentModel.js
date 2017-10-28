const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    karmaPoints: Number,
    parentComment: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

module.exports = mongoose.model('Comment', commentSchema)