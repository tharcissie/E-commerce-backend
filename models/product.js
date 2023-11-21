'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.user, { foreignKey: 'userId' });
      product.belongsTo(models.category, { foreignKey: 'category', as: 'productCategory', });
    }
  }
  product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image:DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};