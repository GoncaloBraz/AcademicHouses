const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerLocation');

router.get('/', controller.getLocation);
router.post('/', controller.postLocation);


module.exports = router;