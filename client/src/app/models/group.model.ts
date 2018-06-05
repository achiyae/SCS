class Group implements Serializable<Group> {
    _id:  string;
    name: string;
    
    deserialize(input) {
    	this._id = input._id;
    	this.name = input.name;
    	return this;
    }
}

export default Group;