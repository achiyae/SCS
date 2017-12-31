"use strict";

module.exports = function(sequelize, DataTypes) {
  var Phase = sequelize.define('phase', {
    name: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  });
  return Phase;
};
