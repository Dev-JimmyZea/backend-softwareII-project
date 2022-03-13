import { Router } from 'express'
const router = Router()
import { getCareers, getCareer, createCareer, updateCareer, deleteCareer, deleteAllCareers } from '../controllers/careers'
import { verifyToken } from '../utils/auth'

router.get('/', getCareers)
router.get('/:id', verifyToken, getCareer)
router.post('/', verifyToken, createCareer)
router.put('/:id', verifyToken, updateCareer)
router.delete('/:id', verifyToken, deleteCareer)
router.delete('/', verifyToken, deleteAllCareers)

export default router