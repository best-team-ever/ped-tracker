'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {id: "40dc09ad-c035-47cf-8587-8622c4319d86",
      first_name: "Jeanphilippe",
      last_name: "Bornier",
      email: "jeanphilippe.bornier@decathlon.com",
      p2pe_agreement: 1,
      language: "en",
      role: "cashier",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id: "700cb59b-91fd-42b3-aa41-3702f0b8611d",
      first_name:"Yuanqin",
      last_name: "Deng",
      email: "yuanqin.deng@decathlon.com",
      p2pe_agreement: 1,
      language: "en",
      role: "admin",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"ae6233bb-90db-42bc-8f18-17a0d31c0100",
      first_name:"Olivier",
      last_name: "Masurel",
      email: "olivier.masurel@decathlon.com",
      p2pe_agreement: 0,
      language: "en",
      role: "admin",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"1d72faa0-318a-44c1-a15a-87f583094d7f",
      first_name:"Frederic",
      last_name: "Delimeux",
      email: "frederic.delimeux@decathlon.com",
      p2pe_agreement: 0,
      language: "en",
      role: "rim",
      location_id: "6f76b910-912a-4c92-bf18-e742aff30737",
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
