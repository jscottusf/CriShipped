'use strict';
var cartController = require('../../controllers/cart.controller.js');
var express = require('express');
var router = express.Router();

/* Cart Routes */
router.all('/cart', cartController.cartDetail);

module.exports = router;