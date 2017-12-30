"use strict";
var Domain = require("./domain");

module.exports = function(sequelize, DataTypes) {
  var Requirement = sequelize.define('requirement', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    description: DataTypes.TEXT,
    domain_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Domain,
        key: 'name'
      }
    }
  });
  return Requirement;
};
