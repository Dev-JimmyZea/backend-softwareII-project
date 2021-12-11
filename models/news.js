'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewsSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
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

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

});


module.exports = mongoose.model('news', NewsSchema);