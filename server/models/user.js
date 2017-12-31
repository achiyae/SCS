"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    email: {type: DataTypes.STRING, primaryKey: true},
    code: DataTypes.TEXT
  });
  return User;
};
