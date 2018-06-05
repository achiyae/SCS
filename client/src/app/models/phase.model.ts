
class Phase implements Serializable<Phase> {
    _id:   string;
    name:  string;
    done:  boolean;
    
    deserialize(input) {
			this._id = input._id;
			this.name = input.name;
			this.done = input.done;
    	return this;
    }
}

export default Phase;