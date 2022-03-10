const mongoose = require('mongoose')

const { dbConfig } = require('../src/config').default

const { port, host, name } = dbConfig

const url = `mongodb://${host}:${port}/${name}`

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB to database ' + url.split('/').pop()))
    .catch(err => console.error(err))
    

module.exports = mongoose    