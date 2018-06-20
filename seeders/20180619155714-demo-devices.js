'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('devices', [{
      brand: "Verifone",
      model: "Vx 680",
      serial_nr: "315-798-709",
      tid: "30789961",
      location_id: 1,
      till_label: "",
      status: "Active",
      security_bag_sn: "",
      last_inspection_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('devices', null, {});
  }
};
