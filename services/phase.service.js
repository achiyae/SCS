// Getting the Newly created Mongoose Model we just created 
var Phase = require('../models/phase.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getPhases = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var phases = await Phase.paginate(query, options)
        
        // Return the phase list that was returned by the mongoose promise
        return phases;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Phases')
    }
}

exports.createPhase = async function(phase){
    
    // Creating a new Mongoose Object by using the new keyword
    var newPhase = new Phase({
		name: phase.name,
		done: phase.done
    })

    try{

        // Saving the Phase
        var savedPhase = await newPhase.save()

        return savedPhase;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Phase")
    }
}

exports.updatePhase = async function(phase){
    var id = phase.id

    try{
        //Find the old Phase Object by the Id
    
        var oldPhase = await Phase.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the Phase")
    }

    // If no old Phase Object exists return false
    if(!oldPhase){
        return false;
    }

    console.log(oldPhase)

    //Edit the Phase Object
	oldPhase.name: phase.name
	oldPhase.done: phase.done
	
    console.log(oldPhase)

    try{
        var savedPhase = await oldPhase.save()
        return savedPhase;
    }catch(e){
        throw Error("And Error occurred while updating the Phase");
    }
}

exports.deletePhase = async function(id){
    
    // Delete the Phase
    try{
        var deleted = await Phase.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Phase Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the Phase")
    }
}
