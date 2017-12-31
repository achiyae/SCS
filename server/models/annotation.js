"use strict";
/*var User = require("./user");
var Requirement = require("./requirement");*/

module.exports = function(sequelize, DataTypes) {
  var Annotation = sequelize.define('annotation', {
    position: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
  });
  return Annotation;
};
