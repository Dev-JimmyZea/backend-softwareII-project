'use strict';

const express = require('express');

const app = express();
const cors = require('cors');

require('../drivers/connect-mongo');

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes
// app.use('/product',require('../routes/products'));
// app.use('/detail', require('../routes/details'));
// app.use('/bill',require('../routes/bills'));
module.exports = app;
