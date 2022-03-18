import { Router } from 'express'
const router = Router()
import { getNews, getNew, createNew, updateNew, deleteNew, deleteAllNews } from '../controllers/news'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'


router.get('/', getNews)
router.get('/:code', verifyToken, getNew)
router.post('/', verifyToken, upload.single('image'), createNew)
router.put('/:id', verifyToken, updateNew)
router.delete('/:code',verifyToken, deleteNew)
router.delete('/', verifyToken, deleteAllNews)

export default router