const User = require('../models/user')
const Career = require('../models/career')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({
                role: {
                    $ne: 'SUPERADMIN'
                }
            }).populate('career')
            return res.status(200).json({
                message: 'Users fetched successfully',
                data: users
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch users',
                error: err
            })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('career')
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                })
            }
            return res.status(200).json({
                message: 'User fetched successfully',
                data: user
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch user',
                error: err
            })
        }
    },

    createUser: async (req, res) => {
        try {        

            const user = new User(req.body)

            const userEmailExist = await User.findOne({
                email: user.email
            })

            const userIdExist = await User.findOne({
                userId: user.userId
            })
            
            if (userEmailExist || userIdExist) {
                return res.status(400).json({
                    message: 'User already exists',
                })
            }

            if (req.body.career) {
                const career = await Career.findById(req.body.career)
                user.career = career
                if (!career) {
                    return res.status(404).json({
                        message: 'Career not found',
                    })
                }
                
            }

            user.password = await bcrypt.hash(user.password, 10)

            const token = jwt.sign({
                userId: user.userId,
                email: user.email,
                role: user.role,
                name: user.name
            }, 'SECRET', { expiresIn: '1h' })

            await user.save()

            return res.status(200).json({
                message: 'User created successfully',
                data: user,
                token: token
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create user',
                error: err
            })
        }
    },


    updateUser: async (req, res) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)

            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                })
            }
            return res.status(200).json({
                message: 'User updated successfully',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update user',
                error: err
            })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                })
            }
            return res.status(200).json({
                message: 'User deleted successfully',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete user',
                error: err
            })
        }
    },

    deleteAllUsers: async (req, res) => {
        try {
            const users = await User.deleteMany({
                role: {
                    $ne: 'SUPERADMIN'
                }
            })
            if (!users) {
                return res.status(404).json({
                    message: 'Users not found',
                })
            }
            return res.status(200).json({
                message: 'Users deleted successfully',
                data: users
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete users',
                error: err
            })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                })
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(401).json({
                    message: 'Invalid password'
                })
            }
            const token = jwt.sign({
                userId: user.userId,
                email: user.email,
                role: user.role,
                name: user.name
            }, 'SECRET', { expiresIn: '1h' })
            return res.status(200).json({
                message: 'User logged in successfully',
                data: user,
                token: token
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to login user',
                error: err
            })
        }
    } 

}
