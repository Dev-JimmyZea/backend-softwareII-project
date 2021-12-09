'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },

    charge: {
        type: String,
        required: true  
    },

    description: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    applicants: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

    base_salary: {
        type: Number,
        required: true
    },


});

module.exports = mongoose.model('work', WorkSchema);
