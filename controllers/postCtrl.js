const Post = require('../models/postModel')
const mongoose = require('mongoose')

exports.createPost = (post) => {
    const newPost = new Post({
        username: post.username,
        post_type: post.post_type,
        pwd_hash: post.pwd_hash, 
        post_title: post.post_title,
        post_url: post.post_url,
        post_parent: post.post_parent,
        hanesst_id: post.hanesst_id,
        post_text: post.post_text
    })  
    newPost.save()  
}

exports.getPosts = () => {
    return Post.find({}, 'title content karmaPoints createdAt').where('deletedAt').equals(null)
}

exports.getPost = (postId) => {
    return Post.findById(postId).where('deletedAt').equals(null)
}

exports.deletePost = (postId) => {
    return Post.findOneAndUpdate({ '_id': postId }, { $set: { deletedAt: new Date() } }, { new: true })
}

exports.setCommentToPost = (commentId, postId) => {
    return Post.findOneAndUpdate({_id: postId}, {$push: { comments: commentId}})
}