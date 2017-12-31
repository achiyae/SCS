var models = require("../models"); //place on top of the file</pre>

exports.getuser = function(req, res) {
  models.user.findOrCreate({where: {email: req.query.email }})
    .spread(function(user, created) {
      res.json(user);
      if (created) {
        console.log('Created new user: ' + user.email);
      }
    });
};

exports.getdomain = function(req, res) {
  models.domain.findById(req.query.name)
    .then(function(domain){
      res.json(domain);
    })
    .catch(function(error){
      console.log("ops: " + error);
      res.status(500).json({ error: 'error' });
    });
};

exports.getrequirements = function(req, res) {
  models.requirement.findAll({ Where: { domain_id: req.query.domain_id }})
    .then(function(requirements){
      res.json(requirements);
    });
};

exports.getannotations = function(req, res) {
  models.annotation.findAll({ Where: { user_id: req.query.user_id, requirement_id: req.query.requirement_id } })
    .then(function(annotations){
      res.json(annotations);
    });
};

exports.saveannotation = function(req, res) {
  models.annotation.create({
    position: req.body.position,
    length: req.body.length,
    user: req.body.user_id,
    requirement: req.body.requirement_id
  },{include: [models.user, models.requirement]})
    .then(function(annotation){
    res.json(annotation.dataValues);
  }).catch(function(error){
    console.log("ops: " + error);
    res.status(500).json({ error: 'error' });
  });
};

