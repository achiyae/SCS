"use strict";
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("group", {
    name: {type: DataTypes.STRING, primaryKey: true},
  });
  return Group;
};
