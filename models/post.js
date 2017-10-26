import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    karmaPoints: Number
})