'use strict';

import { Router } from 'express';
const router = Router();
import { getForums, getForum, createForum, updateForum, deleteForum } from '../controllers/forums';
import { verifyToken } from '../utils/auth';

router.get('/', getForums);
router.get('/:code', getForum);
router.post('/:user', verifyToken, createForum);
router.put('/:id', verifyToken, updateForum);
router.delete('/:code', verifyToken, deleteForum);

export default router;