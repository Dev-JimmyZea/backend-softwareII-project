'use strict';

import { Router } from 'express';
const router = Router();
import { getComments, getComment, createComment, updateComment, deleteComment } from '../controllers/Comments';
import { verifyToken } from '../utils/auth';

router.get('/', getComments);
router.get('/:id', getComment);
router.post('/',verifyToken, createComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

export default router;