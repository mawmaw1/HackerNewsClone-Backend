const Comment = require('../models/commentModel')
const Post = require('../models/postModel')

exports.createComment = (text, username, parentComment) => {
    const comment = new Comment({
        text,
        username,
        parentComment,
        karmaPoints: 1,
        createdAt: new Date(),
    })
    return comment.save()
}