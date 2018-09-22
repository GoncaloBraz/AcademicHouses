const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const registerController = require('../controllers/registerController');

router.get('/', registerController.getRegisterPage);

router.post('/', registerController.postRegisterData);

module.exports = router;