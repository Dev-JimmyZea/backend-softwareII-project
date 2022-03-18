import { Router } from 'express'
const router = Router()
import { getWorks, getWork, createWork, updateWork, deleteWork, deleteAllWorks, addApplicant, removeApplicant } from '../controllers/works'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'

router.get('/', getWorks)
router.get('/:code', verifyToken, getWork)
router.post('/', verifyToken, upload.single('image'), createWork)
router.put('/:id', verifyToken, updateWork)
router.delete('/:code',verifyToken, deleteWork)
router.delete('/', verifyToken, deleteAllWorks)
router.put('/:code/:id', verifyToken, addApplicant)
router.put('/remove/:code/:id', verifyToken, removeApplicant)

export default router