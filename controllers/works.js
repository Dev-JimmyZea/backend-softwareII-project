const Works = require('../models/work')

const User = require('../models/user')

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
    getWorks: async (req, res) => {
        try {
            const works = await Works.find().populate('applicants')
            return res.status(200).json({
                message: 'Works fetched successfully',
                data: works
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch works',
                error: err
            })
        }
    },

    getWork: async (req, res) => {
        try {
            const work = await Works.findById(req.params.id).populate('applicants')
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                })
            }
            return res.status(200).json({
                message: 'Work fetched successfully',
                data: work
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch work',
                error: err
            })
        }
    },

    createWork: async (req, res) => {
        try {

            const work = new Works(req.body)

            const workExist = await Works.findOne({
                code: work.code
            })

            if (workExist) {
                return res.status(400).json({
                    message: 'Work already exists',
                })
            }

            if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                work.image = result.secure_url
                await fs.unlink(req.file.path)
            }

            const worksaved = await work.save()

            return res.status(201).json({
                message: 'Work created successfully',
                data: worksaved
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create work',
                error: err
            })
        }
    },

    updateWork: async (req, res) => {
        try {
            const work = await Works.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                })
            }
            return res.status(200).json({
                message: 'Work updated successfully',
                data: work
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update work',
                error: err
            })
        }
    },

    deleteWork: async (req, res) => {
        try {
            const work = await Works.findByIdAndDelete(req.params.id)
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                })
            }
            return res.status(200).json({
                message: 'Work deleted successfully',
                data: work
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete work',
                error: err
            })
        }
    },

    deleteAllWorks: async (req, res) => {
        try {
            const works = await Works.deleteMany({})
            if (!works) {
                return res.status(404).json({
                    message: 'Works not found',
                })
            }
            return res.status(200).json({
                message: 'Works deleted successfully',
                data: works
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete works',
                error: err
            })
        }
    },

    addApplicant: async (req, res) => {
        try {

            const work = await Works.findOneAndUpdate({
                _id: req.params.idWork
            }, {
                $push: {
                    applicants: req.params.id
                }
            }, {
                new: true
            }).populate('applicants')
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                })
            }
            return res.status(200).json({
                message: 'Applicant added successfully',
                data: work
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to add applicant',
                error: err
            })
        }
    },

    removeApplicant: async (req, res) => {
        try {
            const work = await Works.findOneAndUpdate({
                _id: req.params.idWork
            }, {
                $pull: {
                    applicants: req.params.id
                }
            }, {
                new: true
            }).populate('applicants')
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                })
            }
            return res.status(200).json({
                message: 'Applicant removed successfully',
                data: work
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to remove applicant',
                error: err
            })
        }
    },
    
    getWorksByUser: async (req, res) => {
        try {
            const works = await Works.find({
                applicants: req.params.id
            })
            if (!works) {
                return res.status(404).json({
                    message: 'Works not found',
                })
            }
            return res.status(200).json({
                message: 'Works fetched successfully',
                data: works
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch works',
                error: err
            })
        }
    }

}
