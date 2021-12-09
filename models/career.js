'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const careerSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    faculty: {
        type: String,
        required: true,
        enum: [
            'Ciencias Agropecuarias', 
            'Ciencias', 
            'Ciencias de la Educación', 
            'Ciencias Económicas y Administrativas', 
            'Ciencias de la Salud', 
            'Derecho y Ciencias Sociales', 
            'Ingeniería', 
            'Estudios a Distancia', 
            'Seccional Chiquinquirá', 
            'Seccional Duitama',
            'Seccional Sogamoso',
        ]
    },

});


module.exports = mongoose.model('career', careerSchema);


