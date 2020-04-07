"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductBrand = sequelize.define(
    "ProductBrand",
    {
      ProductId: DataTypes.INTEGER,
      BrandId: DataTypes.INTEGER,
    },
    {}
  );
  ProductBrand.associate = function(models) {
    ProductBrand.hasMany(models.Brand, {
      onDelete: "cascade",
    });
  };
  return ProductBrand;
};
