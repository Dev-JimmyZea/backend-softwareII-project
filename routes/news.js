'use strict';

import { Router } from 'express';
const router = Router();
import { getNews, getNew, createNew, updateNew, deleteNew, login } from '../controllers/news';
import { verifyToken } from '../utils/auth';

router.get('/', getNews);
router.get('/:userId', getNew);
router.post('/', createNew);
router.put('/:id', verifyToken, updateNew);
router.delete('/:userId',verifyToken, deleteNew);

export default router;