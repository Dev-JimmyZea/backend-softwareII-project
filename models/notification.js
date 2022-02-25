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
    
    forum: {
        type: Schema.Types.ObjectId,
        ref: 'forum'
    },

    text: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('notification', NotificationSchema);

