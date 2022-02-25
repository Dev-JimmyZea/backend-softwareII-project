'use strict';

import { Router } from 'express';
const router = Router();
import { getWorks, getWork, createWork, updateWork, deleteWork } from '../controllers/works';
import { verifyToken } from '../utils/auth';

router.get('/', getWorks);
router.get('/:code', getWork);
router.post('/', createWork);
router.put('/:id', verifyToken, updateWork);
router.delete('/:code',verifyToken, deleteWork);

export default router;