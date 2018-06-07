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
    
    equals(other: Annotation): boolean {
    	if(this._id == null && other._id == null) {
    		return (this.position === other.position) &&
				    	 (this.length === other.length) &&
				    	 (this.requirement === other.requirement);
    	}
    	return this._id === other._id;
    }
}

export default Annotation;