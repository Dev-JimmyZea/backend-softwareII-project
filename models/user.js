const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        trim: true,
        enum: [
            'STUDENT',
            'ADMIN',
            'SUPERADMIN'
        ],
        default: 'STUDENT',
        required: true
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

    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'notification'
    }],

    image: {
        type: String,
        default: 'https://res.cloudinary.com/jimmyzea03/image/upload/v1647659251/rmwwy26w14goverqedb1.jpg'
    }

})

module.exports = mongoose.model('user', UserSchema)



