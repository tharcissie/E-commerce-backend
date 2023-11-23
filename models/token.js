"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    static associate(models) {
      token.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  token.init(
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      expirationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "token",
    }
  );
  return token;
};
