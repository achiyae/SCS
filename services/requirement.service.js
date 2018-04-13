// Getting the Newly created Mongoose Model we just created 
var Requirement = require('../models/requirement.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getRequirements = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var requirements = await Requirement.paginate(query, options)

        // Return the requirement list that was returned by the mongoose promise
        return requirements;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Requirements')
    }
}

exports.createRequirement = async function(requirement){
    // Creating a new Mongoose Object by using the new keyword
    var newRequirement = new Requirement({
		rid: requirement.rid,
		description: requirement.description
    })

    try{

        // Saving the Requirement
        var savedRequirement = await newRequirement.save()

        return savedRequirement;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Requirement")
    }
}

exports.updateRequirement = async function(requirement){
    var id = requirement.id

    try{
        //Find the old Requirement Object by the Id
    
        var oldRequirement = await Requirement.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the Requirement")
    }

    // If no old Requirement Object exists return false
    if(!oldRequirement){
        return false;
    }

    console.log(oldRequirement)

    //Edit the Requirement Object
	oldRequirement.rid: requirement.rid
	oldRequirement.description: requirement.description

    console.log(oldRequirement)

    try{
        var savedRequirement = await oldRequirement.save()
        return savedRequirement;
    }catch(e){
        throw Error("And Error occurred while updating the Requirement");
    }
}

exports.deleteRequirement = async function(id){
    
    // Delete the Requirement
    try{
        var deleted = await Requirement.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Requirement Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the Requirement")
    }
}
