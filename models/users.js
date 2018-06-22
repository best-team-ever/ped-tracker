'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    p2pe_agreement: DataTypes.INTEGER,
    language: DataTypes.STRING,
    role: DataTypes.STRING,
    location_id: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    // associations can be defined here user as one location
    users.belongsTo(models.locations, {
      foreignKey: "location_id",
      targetKey: "id"
    })

    // users.hasOne(models.locations, {
    //   foreignKey: {
    //     name: 'id',
    //     allowNull: false
    //   },
    //   targetKey: "location_id"
    // })

    users.hasMany(models.events, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    })
  };
  return users;
};
