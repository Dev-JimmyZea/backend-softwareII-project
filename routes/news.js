'use strict';

const { Router } = require('express');
const router = Router();
const { getNews, getNew, createNew, updateNew, deleteNew, login } = require('../controllers/news');
const { verifyToken } = require('../utils/auth');

router.get('/', getNews);
router.get('/:userId', getNew);
router.post('/', createNew);
router.put('/:id', verifyToken, updateNew);
router.delete('/:userId',verifyToken, deleteNew);

module.exports = router;