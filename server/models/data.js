"use strict";

module.exports = function(sequelize) {
  var domains = [
    {
      name: 'ATM',
      requirements: [
        {id: 1, description: 'requirement 1', domain_id: 'ATM'},
        {id: 2, description: 'requirement 2', domain_id: 'ATM'},
      ]
    },
    {
      name: 'Pacman',
      requirements: []
    }
  ];

  domains.forEach(function (domain) {
    sequelize.models['domain']
      .create({name: domain.name,})
      .then(function (returned_domain) {
        sequelize.models['requirement']
          .bulkCreate(domain.requirements)
          .then(function (requirements) {
          })
          .catch(function (requirements_error) {
            console.error("error in creating requirements: " + requirements_error);
          });
      }).catch(function (domain_error) {
      console.error("error creating domain: " + domain_error);
    });
  });
};
