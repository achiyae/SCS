"use strict";
/*var Domain = require("./domain");*/

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    email: {type: DataTypes.STRING, primaryKey: true},
    code: DataTypes.TEXT,
    phase: { type: DataTypes.INTEGER, defaultValue: 0 },
    domain_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'domains',
        key: 'name'
      }
    }
  });
  return User;
};
