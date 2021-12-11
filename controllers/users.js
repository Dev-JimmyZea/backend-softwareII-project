'use strict';

const User = require('../models/user');
// const Career = require('../models/career');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getUsers: async (req, res) => {
        try {
            // console.log(req.decoded)
            const users = await User.find();
            return res.status(200).json({
                message: 'Users fetched successfully',
                users: users
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch users',
                error: err
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findOne({
                userId: req.params.userId
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                message: 'User fetched successfully',
                user: user
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch user',
                error: err
            });
        }
    },

    createUser: async (req, res) => {
        try {        

            const user = new User(req.body);

            const userExist = await User.findOne({
                email: user.email
            });
            if (userExist) {
                return res.status(400).json({
                    message: 'User already exists',
                });
            }

            user.password = await bcrypt.hash(user.password, 10);

            const token = jwt.sign({
                userId: user.userId,
                email: user.email,
                role: user.role,
                name: user.name
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            await user.save();

            return res.status(200).json({
                message: 'User created successfully',
                newUser: user,
                token: token
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create user',
                error: err
            });
        }
    },


    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                message: 'User updated successfully',
                updated_user: user
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update user',
                error: err
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({
                userId: req.params.userId
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                message: 'User deleted successfully',
                data: user
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete user',
                error: err
            });
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }
            const token = jwt.sign({
                userId: user.userId,
                email: user.email,
                role: user.role,
                name: user.name
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                message: 'User logged in successfully',
                user: user,
                token: token,                
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to login user',
                error: err
            });
        }
    } 

};
