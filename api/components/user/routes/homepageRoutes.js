const express = require('express');
const router = express.Router();
const HomePageController = require('../controllers/homePageController');

router.get('/', HomePageController.getHomePage);

module.exports = router;