import Annotation from './annotation.model';
import Domain from './domain.model';
import Group from './group.model';
import Phase from './phase.model';

class User {
  _id:         string;
  email:       string;
  code:        string;
  domain:      string;
  phases:      Phase[];
  annotations: Annotation[];
  group:    	 string;

  constructor(email: string, group: Group, domain_id: string) {
    this.email = email;
    this.group = group._id;
    this.domain = domain_id;
  }
}

export default User;