const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    url: String,
    username: String,
    karmaPoints: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

module.exports = mongoose.model('Post', postSchema)