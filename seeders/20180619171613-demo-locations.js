'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locations', [{
      location_type: "store",
      name: "GILTBROOK",
      address: "Ikea Retail Park, Nottingham NG16 2RP",
      country: "UK",
      contact_name: "Connell Nick",
      contact_position: "Operations Manager",
      contact_phone: "44115 938 2020",
      contact_email: "nick.connell@decathlon.com",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {});
  }
};
