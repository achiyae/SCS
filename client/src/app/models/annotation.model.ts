import Requirement from './requirement.model';

class Annotation {
    _id:         string;
    position:    number;
    length:      number;
    requirement: Requirement;
}

export default Annotation;