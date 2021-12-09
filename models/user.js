'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },    

    career: {
        type: Schema.Types.ObjectId,
        ref: 'career',
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    userType: {
        type: String,
        trim: true,
        enum: [
            'student',
            'admin'
        ]
    },

    gender: {
        type: String,
        trim: true,
        enum: [
            'M',
            'F'
        ],    
        required: true    
    },

    CV: {
        type: Buffer,
    }


});

module.exports = mongoose.model('user', UserSchema);



