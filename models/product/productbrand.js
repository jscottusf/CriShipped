"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductBrand = sequelize.define(
    "ProductBrand",
    {
      ProductId: DataTypes.INTEGER,
      BrandId: DataTypes.INTEGER
    },
    {}
  );
  ProductBrand.associate = function(models) {
    // associations can be defined here
  };
  return ProductBrand;
};