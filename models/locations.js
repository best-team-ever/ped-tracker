'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define('locations', {
    location_type: DataTypes.STRING,
    name: DataTypes.STRING,
    site_id: DataTypes.INTEGER,
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
    locations.hasMany(models.events, {
      foreignKey: {
        name: 'location_id',
        allowNull: false
      },
      sourceKey: "id"
    })
    locations.hasMany(models.devices, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
    locations.hasMany(models.users, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
  };
  return locations;
};
