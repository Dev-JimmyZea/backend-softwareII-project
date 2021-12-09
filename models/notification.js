'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotificationSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true        
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    publication: {
        type: Schema.Types.ObjectId,
        ref: 'publication'
    },

    news: {
        type: Schema.Types.ObjectId,
        ref: 'news'
    },

    forum: {
        type: Schema.Types.ObjectId,
        ref: 'forum'
    },

    comment: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('notification', NotificationSchema);

