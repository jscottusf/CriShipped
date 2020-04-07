'use strict';
var catalogueRouter = require("../controllers/cart.controller");

var cartRouter = require("../controllers/cart.controller");
// var checkoutRouter = require("./checkout/checkout.router.js");

var register = function (app) {
  app.use('/catalogue', catalogueRouter); 
  app.use('/cart', cartRouter);
//   app.use('/checkout', checkoutRouter);
};

module.exports = register;