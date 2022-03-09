'use strict';

const Works = require('../models/work');

module.exports = {
    getWorks: async (req, res) => {
        try {
            const works = await Works.find();
            return res.status(200).json({
                message: 'Works fetched successfully',
                data: works
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch works',
                error: err
            });
        }
    },

    getWork: async (req, res) => {
        try {
            const work = await Works.findOne({
                code: req.params.code
            });
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                });
            }
            return res.status(200).json({
                message: 'Work fetched successfully',
                data: work
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch work',
                error: err
            });
        }
    },

    createWork: async (req, res) => {
        try {

            const work = new Works(req.body);

            const workExist = await Works.findOne({
                code: work.code
            });

            if (workExist) {
                return res.status(400).json({
                    message: 'Work already exists',
                });
            }

            const worksaved = await work.save();

            return res.status(201).json({
                message: 'Work created successfully',
                data: worksaved
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create work',
                error: err
            });
        }
    },

    updateWork: async (req, res) => {
        try {
            const work = await Works.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                });
            }
            return res.status(200).json({
                message: 'Work updated successfully',
                data: work
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update work',
                error: err
            });
        }
    },

    deleteWork: async (req, res) => {
        try {
            const work = await Works.findOneAndDelete({
                code: req.params.code
            });
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                });
            }
            return res.status(200).json({
                message: 'Work deleted successfully',
                data: work
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete work',
                error: err
            });
        }
    },

    deleteAllWorks: async (req, res) => {
        try {
            const works = await Works.deleteMany({});
            if (!works) {
                return res.status(404).json({
                    message: 'Works not found',
                });
            }
            return res.status(200).json({
                message: 'Works deleted successfully',
                data: works
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete works',
                error: err
            });
        }
    },

    addApplicant: async (req, res) => {
        try {

            const work = await Works.findOneAndUpdate({
                code: req.params.code
            }, {
                $push: {
                    applicants: req.params.id
                }
            }, {
                new: true
            });
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                });
            }
            return res.status(200).json({
                message: 'Applicant added successfully',
                data: work
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to add applicant',
                error: err
            });
        }
    },

    removeApplicant: async (req, res) => {
        try {
            const work = await Works.findOneAndUpdate({
                code: req.params.code
            }, {
                $pull: {
                    applicants: req.params.id
                }
            }, {
                new: true
            });
            if (!work) {
                return res.status(404).json({
                    message: 'Work not found',
                });
            }
            return res.status(200).json({
                message: 'Applicant removed successfully',
                data: work
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to remove applicant',
                error: err
            });
        }
    }

};
