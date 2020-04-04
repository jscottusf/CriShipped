"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      ProductId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER
    },
    {}
  );
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};