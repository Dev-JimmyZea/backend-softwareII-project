'use strict';

import express, { json, urlencoded } from 'express';

const app = express();
import cors from 'cors';

import '../drivers/connect-mongo';
require('dotenv').config();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());


//routes
app.use('/user',require('../routes/users').default);
app.use('/career', require('../routes/careers').default);
app.use('/comment',require('../routes/comments').default);
app.use('/news',require('../routes/news').default);
app.use('/forum',require('../routes/forums').default);
export default app;
