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

    image: {
        type: String,
        required: true,
        default: 'https://pruebas.icde.gov.co/sites/default/files/styles/large/public/2021-09/default-noticias-small.jpg?itok=rrf-tkPp'
    }    

});


module.exports = mongoose.model('news', NewsSchema);