import { Router } from 'express'
const router = Router()
import { getWorks, getWork, createWork, updateWork, deleteWork, deleteAllWorks, addApplicant, removeApplicant } from '../controllers/works'
import { verifyToken } from '../utils/auth'

router.get('/', getWorks)
router.get('/:code', getWork)
router.post('/', verifyToken, createWork)
router.put('/:id', verifyToken, updateWork)
router.delete('/:code',verifyToken, deleteWork)
router.delete('/', verifyToken, deleteAllWorks)
router.put('/:code/:id', verifyToken, addApplicant)
router.put('/remove/:code/:id', verifyToken, removeApplicant)

export default router