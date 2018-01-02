"use strict";
module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define("domain", {
    name: {type: DataTypes.STRING, primaryKey: true},
    description: {type: DataTypes.STRING}, // TODO add required.
  });
  return Domain;
};
