import { Router } from 'express'
const router = Router()
import { getForums, getForum, createForum, updateForum, deleteForum,deleteAllForums, getForumsByUser } from '../controllers/forums'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'

router.get('/', getForums)
router.get('/:id', getForum)
router.post('/',verifyToken, upload.single('image'), createForum)
router.put('/:id', verifyToken, updateForum)
router.delete('/:id', verifyToken, deleteForum)
router.delete('/', verifyToken, deleteAllForums)
router.get('/user/:id', verifyToken, getForumsByUser)

export default router