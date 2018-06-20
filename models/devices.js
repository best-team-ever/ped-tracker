'use strict';
module.exports = (sequelize, DataTypes) => {
  var devices = sequelize.define('devices', {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    serial_nr: DataTypes.STRING,
    tid: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    till_label: DataTypes.STRING,
    status: DataTypes.STRING,
    security_bag_sn: DataTypes.STRING,
    last_inspection_date: DataTypes.DATE
  }, {});
  devices.associate = function(models) {
    // associations can be defined here
  };
  return devices;
};