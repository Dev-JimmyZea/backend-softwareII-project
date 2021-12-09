'use strict';

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/BE-Project-Software';

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB to database ' + url.split('/').pop()))
    .catch(err => console.error(err));
    

module.exports = mongoose;    