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
    events.belongsTo(models.locations, {
      foreignKey: "location_id",
      targetKey: "id"
    })
    events.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "id"
    })
    events.belongsTo(models.devices, {
      foreignKey: "device_id",
      targetKey: "id"
    })
  };
  return events;
};
