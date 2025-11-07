'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Templates', 'short_description', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Templates', 'long_description', {
      type: Sequelize.TEXT, 
      allowNull: true,
    });
    await queryInterface.removeColumn('Templates', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Templates', 'short_description');
    await queryInterface.removeColumn('Templates', 'long_description');
    await queryInterface.addColumn('Templates', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};