'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      first_name:"de Pablos",
      last_name: "Marta",
      email: "marta.depabloscano@decathlon.com",
      p2pe_agreement: 1,
      language: "en",
      role: "admin",
      location_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
