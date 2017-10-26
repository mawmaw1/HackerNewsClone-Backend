import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    karma: Number
})

const User = mongoose.model('User', userSchema)
