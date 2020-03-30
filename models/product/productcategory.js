'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productID: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {});
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};