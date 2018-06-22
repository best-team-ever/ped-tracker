'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
      .then(() =>
        queryInterface.createTable('devices', {
          id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("gen_random_uuid()")
          },
          brand: {
            type: Sequelize.STRING
          },
          model: {
            type: Sequelize.STRING
          },
          serial_nr: {
            type: Sequelize.STRING
          },
          tid: {
            type: Sequelize.STRING
          },
          location_id: {
            type: Sequelize.UUID,
            references: { model: 'locations', key: 'id' }
          },
          till_label: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.STRING
          },
          security_bag_sn: {
            type: Sequelize.STRING
          },
          last_inspection_date: {
            type: Sequelize.DATE
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
      return queryInterface.dropTable('devices');
    }
};
