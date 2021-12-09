'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const publicationSchema = new Schema({
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
    }    

});    