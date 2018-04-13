// Getting the Newly created Mongoose Model we just created 
var Group = require('../models/group.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getGroups = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var groups = await Group.paginate(query, options)
        
        // Return the group list that was returned by the mongoose promise
        return groups;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Groups')
    }
}

exports.createGroup = async function(group){
    
    // Creating a new Mongoose Object by using the new keyword
    var newGroup = new Group({
		name: group.name
    })

    try{

        // Saving the Group
        var savedGroup = await newGroup.save()

        return savedGroup;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Group")
    }
}

exports.updateGroup = async function(group){
    var id = group.id

    try{
        //Find the old Group Object by the Id
    
        var oldGroup = await Group.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the Group")
    }

    // If no old Group Object exists return false
    if(!oldGroup){
        return false;
    }

    console.log(oldGroup)

    //Edit the Group Object
	oldGroup.name: group.name
	
    console.log(oldGroup)

    try{
        var savedGroup = await oldGroup.save()
        return savedGroup;
    }catch(e){
        throw Error("And Error occurred while updating the Group");
    }
}

exports.deleteGroup = async function(id){
    
    // Delete the Group
    try{
        var deleted = await Group.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Group Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the Group")
    }
}
