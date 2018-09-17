'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {id: "40dc09ad-c035-47cf-8587-8622c4319d86",
      first_name: "JeanPhi",
      last_name: "-",
      email: "jpb@dk.com",
      p2pe_agreement: 1,
      language: "en",
      role: "client",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id: "700cb59b-91fd-42b3-aa41-3702f0b8611d",
      first_name:"Yuanqin",
      last_name: "-",
      email: "yd@dk.com",
      p2pe_agreement: 0,
      language: "fr",
      role: "cashier",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"ae6233bb-90db-42bc-8f18-17a0d31c0100",
      first_name:"O",
      last_name: "-",
      email: "publom3@gmail.com",
      p2pe_agreement: 0,
      language: "en",
      role: "admin",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id:"1d72faa0-318a-44c1-a15a-87f583094d7f",
      first_name:"Fred",
      last_name: "-",
      email: "fd@dk.com",
      p2pe_agreement: 1,
      language: "fr",
      role: "cashier",
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
