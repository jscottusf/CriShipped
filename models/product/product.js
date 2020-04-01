'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    sku: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image_url: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    ProductStatus: {type: DataTypes.ENUM, values:['active', 'inactive']},
    isDeleted: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory
    });
    Product.belongsToMany(models.Brand, {
      through: models.ProductBrand
    });
  };
  return Product;
};