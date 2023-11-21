'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'image', {
      type: Sequelize.STRING, // New data type (e.g., INTEGER)
      allowNull: false, // New property (e.g., set to not allow null values)
      defaultValue: "https://res.cloudinary.com/tmysite123/image/upload/v1700553859/zjyqrycx3lhkv3flnphs.webp",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'image', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  }
};
