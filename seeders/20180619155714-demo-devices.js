'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('devices', [
      {id: "102a03e2-eef9-460e-b829-fd56f89abb52",
      brand: "Verifone",
      model: "Vx 680",
      serial_nr: "315-798-709",
      tid: "30789961",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      till_label: "2",
      status: "Active",
      security_bag_sn: "1234",
      last_inspection_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id: "59ced9c8-76cf-4e9a-a18d-0532517c9d23",
      brand: "Verifone",
      model: "Vx 820",
      serial_nr: "900-168-981",
      tid: "30790116",
      location_id: "1d72faa0-318a-44c1-a15a-87f583094d7f",
      till_label: "",
      status: "Active",
      security_bag_sn: "4567",
      last_inspection_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {id: "a02904a4-27fa-491f-b5a0-471da6491e7f",
      brand: "Verifone",
      model: "Vx 680",
      serial_nr: "315-798-708",
      tid: "30790115",
      location_id: "16213c8f-ba02-4120-a1cc-0e735a12d81a",
      till_label: "",
      status: "Active",
      security_bag_sn: "",
      last_inspection_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('devices', null, {});
  }
};
