'use strict';
// const devices = require("./devices").devices;

module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  events.associate = function(models) {
    // associations can be defined here
    // events.hasOne(models.locations, {
    //   foreignKey: {
    //     name: 'location_id',
    //     allowNull: false
    //   },
    //   sourceKey: {
    //     name: "id"
    //   }
    // })
    events.belongsTo(models.locations, {
      foreignKey: "location_id",
      targetKey: "id"
    })
    events.hasOne(models.users, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
    events.belongsTo(models.devices, {
      foreignKey: {
        name: 'device_id',
        allowNull: false
      },
      targetKey: "id"
    })
  };

  // events.belongsTo(devices, {
  //   foreignKey: {
  //     name: 'device_id',
  //     allowNull: false
  //   },
  //   targetKey: "id"
  // })
  return events;
};
