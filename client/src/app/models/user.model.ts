var Annotation = require('./annotation.model');
var Domain = require('./domain.model');
var Group = require('./group.model');
var Phase = require('./phase.model');

class User {
  _id:         string;
  email:       string;
  code:        string;
  domain:      Domain;
  phases:      Phase;
  annotations: Annotation;
  group:       Group;
}

export default User;