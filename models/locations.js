'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define('locations', {
    location_type: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_position: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  locations.associate = function(models) {
    // associations can be defined here
  };
  return locations;
};