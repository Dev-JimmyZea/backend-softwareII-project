import { Router } from 'express'
const router = Router()
import { getComments, getComment, createComment, updateComment, deleteComment } from '../controllers/Comments'
import { verifyToken } from '../utils/auth'

router.get('/', verifyToken, getComments)
router.get('/:id', verifyToken, getComment)
router.post('/',verifyToken, createComment)
router.put('/:id', verifyToken, updateComment)
router.delete('/:id', verifyToken, deleteComment)

export default router