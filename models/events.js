'use strict';
module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  events.associate = function(models) {
    // associations can be defined here
    events.hasOne(models.locations, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
    events.hasOne(models.users, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
    events.hasOne(models.devices, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
  };
  return events;
};
