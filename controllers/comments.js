'use strict';

const Comment = require('../models/comment');

module.exports = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find();
            return res.status(200).json({
                message: 'Comments fetched successfully',
                comments: comments
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
            const comment = await Comment.findOne({ 
                code: req.params.code 
            });

            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }            

            return res.status(200).json({
                message: 'Comment fetched successfully',
                comment: comment
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
            const comment = new Comment(req.body);
            const commentExist = await Comment.findOne({
                code: comment.code
            });

            if (commentExist) {
                return res.status(400).json({
                    message: 'Comment already exists'
                });
            }

            await comment.save();            
            
            return res.status(200).json({
                message: 'Comment created successfully',
                comment: comment
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
                comment: comment
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
            const comment = await Comment.findOneAndDelete({
                code: req.params.code
            });


            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }

            return res.status(200).json({
                message: 'Comment deleted successfully',
                comment: comment
            });
            
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete comment',
                error: err
            });
        }
    }
};

