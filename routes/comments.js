'use strict';

const { Router } = require('express');
const router = Router();
const { getComments, getComment, createComment, updateComment, deleteComment} = require('../controllers/Comments');
const { verifyToken } = require('../utils/auth');

router.get('/', getComments);
router.get('/:code', getComment);
router.post('/',verifyToken, createComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:code', verifyToken, deleteComment);

module.exports = router;