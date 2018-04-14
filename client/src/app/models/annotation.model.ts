var Requirement = require('./requirement.model');

class Annotation {
    _id:         string;
    position:    int;
    length:      int;
    requirement: Requirement;
}

export default Annotation;