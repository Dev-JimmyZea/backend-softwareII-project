// process.env.NODE_ENV === 'development' ? require('dotenv').config() : null
require('dotenv').config()
const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    },
    cloudinaryConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}

export default config