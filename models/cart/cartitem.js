'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quanity: DataTypes.INTEGER
  }, {});
  CartItem.associate = function(models) {
    // associations can be defined here
  };
  return CartItem;
};