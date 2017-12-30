"use strict";
/*var User = require("./user");
var Requirement = require("./requirement");*/

module.exports = function(sequelize, DataTypes) {
  var Annotation = sequelize.define('annotation', {
    position: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'email'
      }
    },
    requirement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'requirements',
        key: 'id'
      }
    }
  });
  return Annotation;
};
