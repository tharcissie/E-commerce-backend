'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  product.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image:DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};