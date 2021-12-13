'use strict';

const { Router } = require('express');
const router = Router();
const { getCareers, getCareer, createCareer, updateCareer, deleteCareer} = require('../controllers/careers');
const { verifyToken } = require('../utils/auth');

router.get('/', getCareers);
router.get('/:code', getCareer);
router.post('/', verifyToken, createCareer);
router.put('/:id', verifyToken, updateCareer);
router.delete('/:code', verifyToken, deleteCareer);

module.exports = router;