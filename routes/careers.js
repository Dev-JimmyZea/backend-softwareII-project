'use strict';

const { Router } = require('express');
const router = Router();
const { getCareers, getCareer, createCareer, updateCareer, deleteCareer} = require('../controllers/careers');
const { verifyToken } = require('../utils/auth');

router.get('/', verifyToken, getCareers);
router.get('/:id',  verifyToken, getCareer);
router.post('/', createCareer);
router.put('/:id', verifyToken, updateCareer);
router.delete('/:id', verifyToken, deleteCareer);

module.exports = router;