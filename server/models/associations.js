"use strict";

module.exports = function(sequelize) {
  const User = sequelize.models['user'];
  const Domain = sequelize.models['domain'];
  const Group = sequelize.models['group'];
  const Phase = sequelize.models['phase'];
  const Requirement = sequelize.models['requirement'];
  const Annotation = sequelize.models['annotation'];

  User.Domain = User.hasOne(Domain);
  Domain.Requirements = Domain.hasMany(Requirement);
  User.Phases = User.hasMany(Phase);
  Annotation.Requirement = Annotation.hasOne(Requirement);
  User.Annotations = User.hasMany(Annotation);
  User.belongsToMany(Group, {through: 'UserGroup'});
  Group.belongsToMany(User, {through: 'UserGroup'});
};
