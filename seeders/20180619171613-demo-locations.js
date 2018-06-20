'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locations', [
      {id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
        location_type: "store",
        name: "GILTBROOK",
        site_id: 260,
        address: "Ikea Retail Park, Nottingham NG16 2RP",
        country: "UK",
        contact_name: "Connell Nick",
        contact_position: "Operations Manager",
        contact_phone: "44115 938 2020",
        contact_email: "nick.connell@decathlon.com",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {id: "1d72faa0-318a-44c1-a15a-87f583094d7f",
        location_type: "store",
        name: "SURREY QUAYS",
        site_id: 240,
        address: "Canada Water Retail Park, Surrey Quays Road, London SE16 2XU",
        country: "UK",
        contact_name: "Gutierrez Antonio",
        contact_position: "Operations Manager",
        contact_phone: "4420 7394 2000",
        contact_email: "antonio.gutierrez1@decathlon.com",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {id: "f14b2e9e-e06d-4cbe-9f32-4819a4a8e699",
        location_type: "store",
        name: "SHEFFIELD",
        site_id: 240,
        address: " 199 Eyre St, Sheffield, South Yorkshire S1 3HU",
        country: "UK",
        contact_name: "Goddart Liz",
        contact_position: "Operations Manager",
        contact_phone: "44114 229 8190",
        contact_email: "liz.goddard@decathlon.com",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {});
  }
};