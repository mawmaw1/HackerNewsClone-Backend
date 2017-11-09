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
        post_text: post.post_text,
        created_at: new Date(),
        points: 1,
    })  
    return newPost.save()  
}

exports.getPosts = (skip, limit) => {
    return Post.aggregate( [
        {$match: { 
                "post_type": "story",
            }
        },
        {$skip: skip},
        {$limit: limit}, 
        {
            $graphLookup: {
                from: "posts",
                startWith: "$hanesst_id",
                connectFromField: "hanesst_id",
                connectToField: "post_parent",
                maxDepth: 2,
                depthField: "comments",
                as: "comments"
            }
        }
    ])
}

exports.getLatestPost = () => {
    return Post.find({}).sort({_id:-1}).limit(1)
}

exports.getCommentsForPost = (id) => {
    return Post.aggregate( [
        {
            $match: { "hanesst_id": id}
        },
        {
            $graphLookup: {
                from: "posts",
                startWith: "$hanesst_id",
                connectFromField: "hanesst_id",
                connectToField: "post_parent",
                maxDepth: 2,
                depthField: "comments",
                as: "comments"
            }
        },
        {$unwind: "$comments"},
        {$replaceRoot: {newRoot: "$comments"}},
        {
            $match: {"post_parent" : id}
        },
        {
            $graphLookup: {
                from: "posts",
                startWith: "$hanesst_id",
                connectFromField: "hanesst_id",
                connectToField: "post_parent",
                maxDepth: 2,
                depthField: "comments",
                as: "comments"
            }
        }
    ])
}

exports.votePost = (id, vote) => {
    return Post.findOne({_id: id})
        .then(post => {
            if (vote === 'up') {
                post.points = post.points + 1
            } else if (vote === 'down') {
                post.points = post.points - 1
            }
            return Post.findOneAndUpdate({'_id': post._id}, {$set: {points: post.points}}, { new: true})     
        })

}

exports.getPost = (postId) => {
    return Post.findById(postId)
}

exports.deletePost = (postId) => {
    return Post.findOneAndUpdate({ '_id': postId }, { $set: { deletedAt: new Date() } }, { new: true })
}

exports.setCommentToPost = (commentId, postId) => {
    return Post.findOneAndUpdate({_id: postId}, {$push: { comments: commentId}})
}