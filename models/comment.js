const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({

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
        ref: 'forum',
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    response_to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
    
})

module.exports = mongoose.model('comment', commentSchema)