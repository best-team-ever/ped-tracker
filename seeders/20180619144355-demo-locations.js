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
      {id: "6f76b910-912a-4c92-bf18-e742aff30737",
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
      {id: "4f8672f1-17fe-41e3-9a8a-a66e04813130",
      location_type: "store",
      name: "BELFAST",
      site_id: 614,
      address: "Holywood Exchange Retail Park, Airport Road West, Belfast BT3 9EJ",
      country: "UK",
      contact_name: "Ireland James",
      contact_position: "Store Manager",
      contact_phone: "4428 9042 2049",
      contact_email: "james.ireland@decathlon.com",
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {});
  }
};
