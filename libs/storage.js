import multer, { diskStorage } from 'multer'
import path from 'path'

const storage = diskStorage({
    destination: path.join(__dirname, '../public/imgs'),

    filename: (req, file, cb) => {
        const url = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, url)
    }
})

const upload = multer({ storage })

export default upload