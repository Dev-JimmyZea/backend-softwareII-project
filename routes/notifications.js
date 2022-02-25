'use strict';

import { Router } from 'express';
const router = Router();
import { getNotifications, getNotification, createNotification, updateNotification, deleteNotification } from '../controllers/notifications';
import { verifyToken } from '../utils/auth';

router.get('/', getNotifications);
router.get('/:code', getNotification);
router.post('/', createNotification);
router.put('/:id', verifyToken, updateNotification);
router.delete('/:code',verifyToken, deleteNotification);

export default router;