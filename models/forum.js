'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const forumSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    topic: {
        type: String,
        required: true
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    image: {
        type: String
    }


});

module.exports = mongoose.model('forum', forumSchema);



    
