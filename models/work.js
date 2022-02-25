'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
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

    is_active: {
        type: Boolean,
        default: true
    },

    image: {
        type: String,
        required: true,
        default: 'https://www.turijobs.com/blog/wp-content/uploads/2018/07/31378593453_29bc0f1726_o-1-1024x659.jpg'
    }

});

module.exports = mongoose.model('work', WorkSchema);
