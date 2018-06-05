import Requirement from './requirement.model';

class Domain implements Serializable<Domain> {
    _id:          string;
    name:         string;
    description:  string;
    requirements: Requirement[] = [];
    
    deserialize(input) {
    	this._id = input._id;
    	this.name = input.name;
    	this.description = input.description;
    	for(let requirement of input.requirements) {
    	  this.requirements.push(new Requirement().deserialize(requirement));
    	}
    	return this;
    }
}



export default Domain;