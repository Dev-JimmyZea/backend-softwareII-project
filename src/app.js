import express, { json, urlencoded } from 'express'
import cors from 'cors'
import '../drivers/connect-mongo'

const { appConfig } = require('../src/config').default
const { port, host } = appConfig

const app = express()

//settings
app.set('port',port || 4000)
app.set('host',host || 'localhost')

//middlewares
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())

//routes
app.use('/user',require('../routes/users').default)
app.use('/career', require('../routes/careers').default)
app.use('/comment',require('../routes/comments').default)
app.use('/news',require('../routes/news').default)
app.use('/forum',require('../routes/forums').default)
app.use('/notification',require('../routes/notifications').default)
app.use('/work',require('../routes/works').default)
app.use('/public', express.static(`${__dirname}/../public/imgs`))
export default app
