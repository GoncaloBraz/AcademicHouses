const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseControllers');

router.get('/', houseController.getAllHousesPage);

module.exports = router;