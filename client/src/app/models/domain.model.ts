var Requirement = require('./requirement.model');

class Domain {
    _id:          string;
    name:         string;
    description:  string;
    requirements: Requirement[];
}

export default Domain;