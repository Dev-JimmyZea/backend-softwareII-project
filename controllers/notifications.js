const Notifications = require('../models/notification')
const User = require('../models/user')
const Forum = require('../models/forum')

module.exports = {
    getNotifications: async (req, res) => {
        try {
            const notifications = await Notifications.find()
            return res.status(200).json({
                message: 'Notifications fetched successfully',
                data: notifications
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch notifications',
                error: err
            })
        }
    },

    getNotification: async (req, res) => {
        try {
            const notification = await Notifications.findOne({
                code: req.params.code
            })
            if (!notification) {
                return res.status(404).json({
                    message: 'Notification not found',
                })
            }
            return res.status(200).json({
                message: 'Notification fetched successfully',
                data: notification
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to fetch notification',
                error: err
            })
        }
    },

    createNotification: async (req, res) => {
        try {
            const user = await User.findOne({
                userId : req.body.user
            })
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                })
            }

            const sender = await User.findOne({
                userId : req.body.sender
            })

            if (!sender) {
                return res.status(404).json({
                    message: 'Sender not found',
                })
            }

            const forum = await Forum.findOne({
                code : req.body.forum
            })

            if (!forum) {
                return res.status(404).json({
                    message: 'Forum not found',
                })
            }

            const notification = new Notifications({
                ...req.body,
                sender: sender._id,
                forum: forum._id,
                user: user._id
            })

            const notificationExist = await Notifications.findOne({
                code: notification.code
            })

            if (notificationExist) {
                return res.status(400).json({
                    message: 'Notification already exists',
                })
            }

            const notificationsaved = await notification.save()

            return res.status(201).json({
                message: 'Notification created successfully',
                data: notificationsaved
            })

        } catch (err) {
            return res.status(500).json({
                message: 'Failed to create notification',
                error: err
            })
        }
    },

    updateNotification: async (req, res) => {
        try {
            const notification = await Notifications.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!notification) {
                return res.status(404).json({
                    message: 'Notification not found',
                })
            }
            return res.status(200).json({
                message: 'Notification updated successfully',
                data: notification
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to update notification',
                error: err
            })
        }
    },

    deleteNotification: async (req, res) => {
        try {
            const notification = await Notifications.findOneAndDelete({
                code: req.params.code
            })
            if (!notification) {
                return res.status(404).json({
                    message: 'Notification not found',
                })
            }
            return res.status(200).json({
                message: 'Notification deleted successfully',
                data: notification
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Failed to delete notification',
                error: err
            })
        }
    }

}
