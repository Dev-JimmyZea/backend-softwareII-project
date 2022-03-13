import { Router } from 'express'
const router = Router()
import { getForums, getForum, createForum, updateForum, deleteForum,deleteAllForums } from '../controllers/forums'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'

router.get('/', getForums)
router.get('/:code', getForum)
router.post('/',verifyToken, upload.single('image'), createForum)
router.put('/:id', verifyToken, updateForum)
router.delete('/:code', verifyToken, deleteForum)
router.delete('/', verifyToken, deleteAllForums)

export default router