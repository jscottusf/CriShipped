'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    unique_cart_id: DataTypes.STRING,
    cart_status: DataTypes.ENUM
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};