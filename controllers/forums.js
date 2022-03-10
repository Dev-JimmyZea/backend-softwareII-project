const User = require('../models/user')

const Forum = require('../models/forum')

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
    getForums: async (req, res) => {
        try {
            const forums = await Forum.find()
            return res.status(200).json({
                message: 'Forums fetched successfully',
                data: forums
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch forums',
                error: err
            })
        }
    },
    getForum: async (req, res) => {
        try {
            const forum = await Forum.findOne({
                code: req.params.code
            })

            if (!forum) {
                return res.status(404).json({
                    message: 'Forum not found'
                })
            }

            return res.status(200).json({
                message: 'Forum fetched successfully',
                data: forum
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch forum',
                error: err
            })
        }
    },
    createForum: async (req, res) => {
        try {
            const user = await User.findOne({
                userId: req.body.user
            })

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const forum = new Forum({
                ...req.body,
                users: [user._id]
            })

            const forumExist = await Forum.findOne({
                code: forum.code
            })

            if (forumExist) {
                return res.status(400).json({
                    message: 'Forum already exists'
                })
            }
            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                forum.image = result.secure_url
            }
            await forum.save()

            await fs.unlink(req.file.path)

            return res.status(200).json({
                message: 'Forum created successfully',
                data: forum
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create forum',
                error: err
            })
        }
    },
    updateForum: async (req, res) => {
        try {
            const forum = await Forum.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            if (!forum) {
                return res.status(404).json({
                    message: 'Forum not found'
                })
            }

            return res.status(200).json({
                message: 'Forum updated successfully',
                data: forum
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update forum',
                error: err
            })
        }
    },
    deleteForum: async (req, res) => {
        try {
            const forum = await Forum.findOneAndDelete({
                code: req.params.code
            })


            if (!forum) {
                return res.status(404).json({
                    message: 'Forum not found'
                })
            }

            return res.status(200).json({
                message: 'Forum deleted successfully',
                data: forum
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete forum',
                error: err
            })
        }
    },

    deleteAllForums: async (req, res) => {
        try {
            const forums = await Forum.deleteMany()

            if (!forums) {
                return res.status(404).json({
                    message: 'Forums not found'
                })
            }

            return res.status(200).json({
                message: 'Forums deleted successfully',
                data: forums
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete forums',
                error: err
            })
        }
    }
}

