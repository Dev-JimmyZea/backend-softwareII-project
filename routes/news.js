import { Router } from 'express'
const router = Router()
import { getNews, getOneNews, createNews, updateNews, deleteNews, deleteAllNews } from '../controllers/news'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'


router.get('/', getNews)
router.get('/:id', getOneNews)
router.post('/', verifyToken, upload.single('image'), createNews)
router.put('/:id', verifyToken, updateNews)
router.delete('/:id',verifyToken, deleteNews)
router.delete('/', verifyToken, deleteAllNews)

export default router