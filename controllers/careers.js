const Career = require('../models/career')

module.exports = {
    getCareers: async (req, res) => {
        try {
            const careers = await Career.find()
            return res.status(200).json({
                message: 'Careers fetched successfully',
                data: careers
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch careers',
                error: err
            })
        }
    },
    getCareer: async (req, res) => {
        try {
            const career = await Career.findById(req.params.id)
            if (!career) {
                return res.status(404).json({
                    message: 'Career not found',
                })
            }

            return res.status(200).json({
                message: 'Career fetched successfully',
                data: career
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch career',
                error: err
            })
        }
    },
    createCareer: async (req, res) => {
        try {
            const career = await new Career(req.body)
            const careerExist = await Career.findOne({
                code: career.code
            })
            
            if (careerExist) {
                return res.status(400).json({
                    message: 'Career already exists',
                })
            }

            await career.save()

            return res.status(200).json({
                message: 'Career created successfully',
                data: career
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create career',
                error: err
            })
        }
    },
    updateCareer: async (req, res) => {
        try {
            
            const careerExist = await Career.findOne({
                code: req.body.code
            })

            if (careerExist) {
                if (careerExist._id.toString() !== req.params.id) {
                    return res.status(400).json({
                        message: 'Career already exists',
                    })
                }
            }
            
            const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            if (!career) {
                return res.status(404).json({
                    message: 'Career not found',
                })
            }
            
            return res.status(200).json({
                message: 'Career updated successfully',
                data: career
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update career',
                error: err
            })
        }
    },

    deleteCareer: async (req, res) => {
        try {
            const career = await Career.findByIdAndDelete(req.params.id)
            if (!career) {
                return res.status(404).json({
                    message: 'Career not found',
                })
            }

            return res.status(200).json({
                message: 'Career deleted successfully',
                data: career
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete career',
                error: err
            })
        }
    },

    deleteAllCareers: async (req, res) => {
        try {
            const careers = await Career.deleteMany()
            if (!careers) {
                return res.status(404).json({
                    message: 'Careers not found',
                })
            }

            return res.status(200).json({
                message: 'Careers deleted successfully',
                data: careers
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete careers',
                error: err
            })
        }
    }
    
}
