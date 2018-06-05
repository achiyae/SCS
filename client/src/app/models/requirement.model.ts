
class Requirement implements Serializable<Requirement> {
    _id:         string;
    rid:         string;
    description: string;
    
    deserialize(input) {
    	this._id = input._id;
    	this.rid = input.rid;
    	this.description = input.description;
    	return this;
    }
}

export default Requirement;