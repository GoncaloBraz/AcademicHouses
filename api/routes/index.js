const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

module.exports = router;