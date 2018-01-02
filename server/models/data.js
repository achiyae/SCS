"use strict";

module.exports = function(sequelize) {
  const User = sequelize.models['user'];
  const Domain = sequelize.models['domain'];
  const Group = sequelize.models['group'];
  const Phase = sequelize.models['phase'];
  const Requirement = sequelize.models['requirement'];
  const Annotation = sequelize.models['annotation'];

  var domains = [
    {
      name: 'ATM',
      description: '',
      requirements: [
        {id: '1', description: 'requirement 1', domain_id: 'ATM'},
        {id: '2', description: 'requirement 2', domain_id: 'ATM'}
      ]
    },
    {
      name: 'Pacman',
      description: '',
      requirements: []
    }
   ];


  domains.forEach(function (domain) {
    Domain.create(
      domain, { include: [ Requirement ] })
  });

  Group.bulkCreate([{name: 'users'}, {name: 'admins'}]);
};
