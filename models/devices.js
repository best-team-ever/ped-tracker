'use strict';
// const events = require("./events").events;

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
    devices.belongsTo(models.locations, {
      foreignKey: "location_id",
      targetKey: "id"
    })

    // devices.hasOne(models.locations, {
    //   foreignKey: {
    //     name: 'id',
    //     allowNull: false
    //   }
    // })
    
    devices.hasMany(models.events, {
      foreignKey: {
        name: 'device_id',
        allowNull: false
      },
      sourceKey: "id"
    })
  };

  // devices.hasMany(events, {
  //   foreignKey: {
  //     name: 'device_id',
  //     allowNull: false
  //   },
  //   sourceKey: "id"
  // })
  return devices;
};
