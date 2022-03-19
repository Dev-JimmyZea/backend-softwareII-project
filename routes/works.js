import { Router } from 'express'
const router = Router()
import { getWorks, getWork, createWork, updateWork, deleteWork, deleteAllWorks, addApplicant, removeApplicant } from '../controllers/works'
import { verifyToken } from '../utils/auth'
import upload from '../libs/storage'

router.get('/', getWorks)
router.get('/:id', verifyToken, getWork)
router.post('/', verifyToken, upload.single('image'), createWork)
router.put('/:id', verifyToken, updateWork)
router.delete('/:id',verifyToken, deleteWork)
router.delete('/', verifyToken, deleteAllWorks)
router.put('/:idWork/:id', verifyToken, addApplicant)
router.put('/remove/:idWork/:id', verifyToken, removeApplicant)

export default router