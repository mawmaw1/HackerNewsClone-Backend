const Post = require('../models/postModel')

exports.createPost = (title, content, url, username) => {
    const post = new Post({
        title,
        content,
        url,
        username,
        karmaPoints: 1,
        createdAt: new Date(),
    })
    return post.save()
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