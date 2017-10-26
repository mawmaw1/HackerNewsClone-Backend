import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    text: String,
    username: String,
    karmaPoints: Number,
    parentComment: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

const Comment = mongoose.model('Comment', commentSchema)