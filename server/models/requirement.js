"use strict";

module.exports = function(sequelize, DataTypes) {
  var Requirement = sequelize.define('requirement', {
    id: {type: DataTypes.STRING, primaryKey: true},
    description: DataTypes.TEXT
  });
  return Requirement;
};
