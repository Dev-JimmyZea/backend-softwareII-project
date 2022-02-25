'use strict';

const Comment = require('../models/comment');
const Forum = require('../models/forum');
const User = require('../models/user');

module.exports = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find();
            return res.status(200).json({
                message: 'Comments fetched successfully',
                data: comments
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch comments',
                error: err
            });
        }
    },
    getComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);

            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }            

            return res.status(200).json({
                message: 'Comment fetched successfully',
                data: comment
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch comment',
                error: err
            });
        }
    },
    createComment: async (req, res) => {
        try {
            const user = await User.findOne({
                userId: req.body.user
            });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const forum = await Forum.findOne({
                code: req.body.forum
            });

            if (!forum) {
                return res.status(404).json({
                    message: 'Forum not found'
                });
            }

            const comment = new Comment({
                ...req.body,
                user: user._id,
                forum: forum._id
            });

            await comment.save();            
            
            return res.status(200).json({
                message: 'Comment created successfully',
                data: comment
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create comment',
                error: err
            });
        }
    },
    updateComment: async (req, res) => {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }

            return res.status(200).json({
                message: 'Comment updated successfully',
                data: comment
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update comment',
                error: err
            });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);

            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }

            return res.status(200).json({
                message: 'Comment deleted successfully',
                data: comment
            });
            
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete comment',
                error: err
            });
        }
    }
};

