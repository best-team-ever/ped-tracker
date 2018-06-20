'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [{
      user_id: "ae6233bb-90db-42bc-8f18-17a0d31c0100",
      device_id: "59ced9c8-76cf-4e9a-a18d-0532517c9d23",
      message: "Add terminal used in cash lab for test",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});

  }
};
