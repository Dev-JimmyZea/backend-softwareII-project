const mongoose = require('mongoose')

const { dbConfig } = require('../src/config').default

const { port, host, name } = dbConfig

const url_dev = `mongodb://${host}:${port}/${name}`

const url_prod = 'mongodb+srv://jimmy:0000@software.rreuz.mongodb.net/db-project?retryWrites=true&w=majority'
const options = {useNewUrlParser: true,  useUnifiedTopology: true};

const url = process.env.NODE_ENV === 'development' ? url_dev : url_prod

mongoose.connect(url, options)
    .then(() => console.log('Connected to MongoDB to database ' + url.split('/').pop()))
    .catch(err => console.error(err))
    

module.exports = mongoose