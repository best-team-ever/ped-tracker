'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
      .then(() =>
        queryInterface.createTable('users', {
          id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("gen_random_uuid()")
          },
          first_name: {
            type: Sequelize.STRING
          },
          last_name: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          p2pe_agreement: {
            type: Sequelize.INTEGER
          },
          language: {
            type: Sequelize.STRING
          },
          role: {
            type: Sequelize.STRING
          },
          location_id: {
            type: Sequelize.UUID,
            references: { model: 'locations', key: 'id' }
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
      return queryInterface.dropTable('users');
    }
};
