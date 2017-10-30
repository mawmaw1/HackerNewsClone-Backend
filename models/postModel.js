const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    username: String,
    post_type: String,
    pwd_hash: String, 
    post_title: String,
    post_url: String,
    post_parent: Number,
    hanesst_id: {type: Number, unique: true},
    post_text: String,
    created_at: Date
})

module.exports = mongoose.model('Post', postSchema)