'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('devices');
  }
};
