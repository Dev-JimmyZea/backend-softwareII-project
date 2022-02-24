'use strict';

import { Router } from 'express';
const router = Router();
import { getCareers, getCareer, createCareer, updateCareer, deleteCareer } from '../controllers/careers';
import { verifyToken } from '../utils/auth';

router.get('/', getCareers);
router.get('/:code', getCareer);
router.post('/', verifyToken, createCareer);
router.put('/:id', verifyToken, updateCareer);
router.delete('/:code', verifyToken, deleteCareer);

export default router;