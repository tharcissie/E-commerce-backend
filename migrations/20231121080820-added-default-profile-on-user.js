'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "profile", {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'https://res.cloudinary.com/tmysite123/image/upload/v1700554418/eeikppqaksqpo6uvmh1b.png'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "profile");
  }
};
