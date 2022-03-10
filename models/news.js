const mongoose = require('mongoose')
const Schema = mongoose.Schema


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

    image: {
        type: String,
        required: true,
        default: "https://source.unsplash.com/category/technology/"
    }
})


module.exports = mongoose.model('news', NewsSchema)