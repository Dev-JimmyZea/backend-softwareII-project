'use strict';

const { Router } = require('express');
const router = Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, login } = require('../controllers/users');
const { verifyToken } = require('../utils/auth');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:userId',verifyToken, deleteUser);
router.post('/login', login);

module.exports = router;