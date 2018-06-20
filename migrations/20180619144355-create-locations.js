'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
      .then(() =>
        queryInterface.createTable('locations', {
          id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("gen_random_uuid()")
          },
          location_type: {
            type: Sequelize.STRING
          },
          name: {
            type: Sequelize.STRING
          },
          site_id: {
            type: Sequelize.STRING
          },
          address: {
            type: Sequelize.STRING
          },
          country: {
            type: Sequelize.STRING
          },
          contact_name: {
            type: Sequelize.STRING
          },
          contact_position: {
            type: Sequelize.STRING
          },
          contact_phone: {
            type: Sequelize.STRING
          },
          contact_email: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.STRING
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        })
      );
    },
    down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locations');
    }
};
