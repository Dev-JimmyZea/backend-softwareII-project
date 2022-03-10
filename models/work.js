const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

    image: {
        type: String,
        required: true,
        default: "https://www.uptc.edu.co/sitio/export/sites/default/portal/.galleries/gal_fon_por/2sem_2021/fot_port_uptc_0" + Math.floor(Math.random() * 15) + ".jpg"
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    valid_until: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('work', WorkSchema)

