'use strict';

const { Router } = require('express');
const router = Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, login } = require('../controllers/users');
const { verifyToken } = require('../utils/auth');

router.get('/', getUsers);
router.get('/:id',  verifyToken, getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);

module.exports = router;