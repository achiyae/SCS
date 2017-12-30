"use strict";
module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define("domain", {
    name: {type: DataTypes.STRING, primaryKey: true},
  });
  return Domain;
};
