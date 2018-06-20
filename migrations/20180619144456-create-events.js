'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
      .then(() =>
        queryInterface.createTable('events', {
          id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("gen_random_uuid()")
          },
          user_id: {
            type: Sequelize.UUID,
            references: { model: 'users', key: 'id' }
          },
          device_id: {
            type: Sequelize.UUID,
            references: { model: 'devices', key: 'id' }
          },
          message: {
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
    return queryInterface.dropTable('events');
  }
};

