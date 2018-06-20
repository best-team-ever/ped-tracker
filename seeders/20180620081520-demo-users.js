'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {id: "40dc09ad-c035-47cf-8587-8622c4319d86",
      first_name: "jeanphilippe",
      last_name: "bornier",
      email: "jeanphilippe.bornier@decathlon.com",
      p2pe_agreement: 1,
      language: "en",
      role: "hotesse",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id: "700cb59b-91fd-42b3-aa41-3702f0b8611d",
      first_name:"yuanqin",
      last_name: "deng",
      email: "yuanqin.deng@decathlon.com",
      p2pe_agreement: 1,
      language: "en",
      role: "admin",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"ae6233bb-90db-42bc-8f18-17a0d31c0100",
      first_name:"olivier",
      last_name: "masurel",
      email: "olivier.masurel@decathlon.com",
      p2pe_agreement: 0,
      language: "en",
      role: "hotesse",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"66defb1c-241d-4337-a835-3d388c78e8bf",
      first_name:"frederic",
      last_name: "delimeux",
      email: "frederic.delimeux@decathlon.com",
      p2pe_agreement: 0,
      language: "en",
      role: "admin",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};