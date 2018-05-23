import Annotation from './annotation.model';
import Domain from './domain.model';
import Group from './group.model';
import Phase from './phase.model';

class User {
  _id:         string;
  email:       string;
  code:        string;
  domain:      Domain;
  phases:      Phase[];
  annotations: Annotation[];
  group:       Group;

  constructor(email: string, group: Group, domain: Domain) {
    this.email = email;
    this.group = group;
    this.domain = domain;
  }
}

export default User;