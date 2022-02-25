'use strict';

import { Router } from 'express';
const router = Router();
import { getNews, getNew, createNew, updateNew, deleteNew } from '../controllers/news';
import { verifyToken } from '../utils/auth';

router.get('/', getNews);
router.get('/:code', getNew);
router.post('/', createNew);
router.put('/:id', verifyToken, updateNew);
router.delete('/:code',verifyToken, deleteNew);

export default router;