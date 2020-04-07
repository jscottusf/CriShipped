'use strict';
var cartController = require('../controllers/cart.controller');
var express = require('express');
var router = express.Router();

/* Cart Routes */
router.all('/', cartController.cartDetail);

module.exports = router;