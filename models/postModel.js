import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    karmaPoints: Number,
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

const Post = mongoose.model('Post', postSchema)