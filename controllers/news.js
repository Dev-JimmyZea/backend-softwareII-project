const News = require('../models/news')

const { cloudinaryConfig } = require('../src/config').default

const { cloud_name, api_key, api_secret } = cloudinaryConfig

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
})

const fs = require('fs-extra')

module.exports = {
    getNews: async (req, res) => {
        try {
            const news = await News.find()
            return res.status(200).json({
                message: 'News fetched successfully',
                data: news
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch news',
                error: err
            })
        }
    },

    getOneNews: async (req, res) => {
        try {
            const news = await News.findById(req.params.id)
            if (!news) {
                return res.status(404).json({
                    message: 'News not found',
                })
            }
            return res.status(200).json({
                message: 'News fetched successfully',
                data: news
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch news',
                error: err
            })
        }
    },

    createNews: async (req, res) => {
        try {
            const news = new News(req.body)

            const newsExist = await News.findOne({
                code: news.code
            })

            if (newsExist) {
                return res.status(400).json({
                    message: 'News already exists',
                })
            }

            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                news.image = result.secure_url
                await fs.unlink(req.file.path)
            }

            const news_saved = await news.save()

            return res.status(201).json({
                message: 'News created successfully',
                data: news_saved
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create news',
                error: err
            })
        }
    },

    updateNews: async (req, res) => {
        try {
            const news = await News.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!news) {
                return res.status(404).json({
                    message: 'News not found',
                })
            }
            return res.status(200).json({
                message: 'News updated successfully',
                data: news
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update news',
                error: err
            })
        }
    },

    deleteNews: async (req, res) => {
        try {
            const news = await News.findByIdAndDelete(req.params.id)
            if (!news) {
                return res.status(404).json({
                    message: 'News not found',
                })
            }
            return res.status(200).json({
                message: 'News deleted successfully',
                data: news
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete news',
                error: err
            })
        }
    },

    deleteAllNews: async (req, res) => {
        try {
            const news = await News.deleteMany({})
            if (!news) {
                return res.status(404).json({
                    message: 'News not found',
                })
            }
            return res.status(200).json({
                message: 'News deleted successfully',
                data: news
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete news',
                error: err
            })
        }
    }

}
