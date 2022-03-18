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

    getNew: async (req, res) => {
        try {
            const new_ = await News.findById(req.params.id)
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                })
            }
            return res.status(200).json({
                message: 'New fetched successfully',
                data: new_
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch new',
                error: err
            })
        }
    },

    createNew: async (req, res) => {
        try {
            const new_ = new News(req.body)

            const newExist = await News.findOne({
                code: new_.code
            })

            if (newExist) {
                return res.status(400).json({
                    message: 'New already exists',
                })
            }

            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                new_.image = result.secure_url
                await fs.unlink(req.file.path)
            }

            const new_saved = await new_.save()

            return res.status(201).json({
                message: 'New created successfully',
                data: new_saved
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create new',
                error: err
            })
        }
    },

    updateNew: async (req, res) => {
        try {
            const new_ = await News.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                })
            }
            return res.status(200).json({
                message: 'New updated successfully',
                data: new_
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update new',
                error: err
            })
        }
    },

    deleteNew: async (req, res) => {
        try {
            const new_ = await News.findByIdAndDelete(req.params.id)
            if (!new_) {
                return res.status(404).json({
                    message: 'New not found',
                })
            }
            return res.status(200).json({
                message: 'New deleted successfully',
                data: new_
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete new',
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
