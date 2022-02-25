'use strict';

const News = require('../models/news');

module.exports = {
    getNews: async (req, res) => {
        try {
            const news = await News.find();
            return res.status(200).json({
                message: 'News fetched successfully',
                data: news
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch news',
                error: err
            });
        }
    },

    getNew: async (req, res) => {
        try {
            const new_ = await News.findOne({
                code: req.params.code
            });
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                });
            }
            return res.status(200).json({
                message: 'New fetched successfully',
                data: new_
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch new',
                error: err
            });
        }
    },

    createNew: async (req, res) => {
        try {
            const new_ = new News(req.body);

            const newExist = await News.findOne({
                code: new_.code
            });

            if (newExist) {
                return res.status(400).json({
                    message: 'New already exists',
                });
            }

            const new_saved = await new_.save();

            return res.status(201).json({
                message: 'New created successfully',
                data: new_saved
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create new',
                error: err
            });
        }
    },

    updateNew: async (req, res) => {
        try {
            const new_ = await News.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                });
            }
            return res.status(200).json({
                message: 'New updated successfully',
                data: new_
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update new',
                error: err
            });
        }
    },

    deleteNew: async (req, res) => {
        try {
            const new_ = await News.findOneAndDelete({
                code: req.params.code
            });
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                });
            }
            return res.status(200).json({
                message: 'New deleted successfully',
                data: new_
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete new',
                error: err
            });
        }
    }

};
