var models = require("../models"); //place on top of the file</pre>

exports.getusers = function(req, res) {
  models.User.findAll().then(function(users){
    res.json(users);
  });
};

exports.saveusers = function(req, res) {
  models.User.create({
    email: req.body.email
  }).then(function(users){
    res.json(users.dataValues);
  }).catch(function(error){
    console.log("ops: " + error);
    res.status(500).json({ error: 'error' });
  });
};

exports.getdomains = function(req, res) {
  models.Domain.findAll().then(function(domains){
    res.json(domains);
  });
};

exports.savedomains = function(req, res) {
  models.Domain.create({
    name: req.body.name
  }).then(function(domains){
    res.json(domains.dataValues);
  }).catch(function(error){
    console.log("ops: " + error);
    res.status(500).json({ error: 'error' });
  });
};

exports.getrequirements = function(req, res) {
  models.Requirement.findAll().then(function(requirements){
    res.json(requirements);
  });
};

exports.saverequirements = function(req, res) {
  models.Requirement.create({
    id: req.body.id,
    description: req.body.description,
    domain_id: req.body.domain_id
  }).then(function(requirements){
    res.json(requirements.dataValues);
  }).catch(function(error){
    console.log("ops: " + error);
    res.status(500).json({ error: 'error' });
  });
};

exports.getannotations = function(req, res) {
  models.Annotation.findAll().then(function(annotations){
    res.json(annotations);
  });
};

exports.saveannotations = function(req, res) {
  models.Annotation.create({
    position: req.body.position,
    length: req.body.length,
    user_id: req.body.user_id,
    requirement_id: req.body.requirement_id
  }).then(function(annotations){
    res.json(annotations.dataValues);
  }).catch(function(error){
    console.log("ops: " + error);
    res.status(500).json({ error: 'error' });
  });
};
