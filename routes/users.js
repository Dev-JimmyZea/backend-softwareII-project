'use strict';

import { Router } from 'express';
const router = Router();
import { getUsers, getUser, createUser, updateUser, deleteUser, login } from '../controllers/users';
import { verifyToken } from '../utils/auth';

router.get('/',verifyToken, getUsers);
router.get('/:userId', verifyToken, getUser);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:userId',verifyToken, deleteUser);
router.post('/login', login);

export default router;