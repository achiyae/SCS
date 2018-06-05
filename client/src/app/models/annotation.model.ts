import Requirement from './requirement.model';

class Annotation implements Serializable<Annotation> {
    _id:         string;
    position:    number;
    length:      number;
    requirement: string;
    
    constructor(position?: number, length?:number, requirement?: string) {
    	if(position != null) {
	    	this.position = position;
	    	this.length = length;
	    	this.requirement = requirement;
	   	}
    }
    
    deserialize(input) {
    	this._id = input._id;
    	this.position = input.position;
    	this.length = input.length;
    	this.requirement = input.requirement;
    	return this;
    }
}

export default Annotation;