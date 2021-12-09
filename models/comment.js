'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true   
    },

    text: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    forum: {
        type: Schema.Types.ObjectId,
        ref: 'forum'
    },

    publication: {
        type: Schema.Types.ObjectId,
        ref: 'publication'
    },

});

module.exports = mongoose.model('comment', commentSchema);