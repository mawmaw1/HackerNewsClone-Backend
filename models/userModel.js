import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    karmaPoints: Number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
})

const User = mongoose.model('User', userSchema)
