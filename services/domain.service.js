// Getting the Newly created Mongoose Model we just created 
var Domain = require('../models/domain.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getDomains = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var domains = await Domain.paginate(query, options)
        
        // Return the domain list that was returned by the mongoose promise
        return domains;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Domains')
    }
}

exports.createDomain = async function(domain){
    
    // Creating a new Mongoose Object by using the new keyword
    var newDomain = new Domain({
		name: domain.name,
		description: domain.description,
		requirements: domain.requirements
    })

    try{

        // Saving the Domain
        var savedDomain = await newDomain.save()

        return savedDomain;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Domain")
    }
}

exports.updateDomain = async function(domain){
    var id = domain.id

    try{
        //Find the old Domain Object by the Id
    
        var oldDomain = await Domain.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the Domain")
    }

    // If no old Domain Object exists return false
    if(!oldDomain){
        return false;
    }

    console.log(oldDomain)

    //Edit the Domain Object
	oldDomain.name: domain.name
	oldDomain.description: domain.description
	oldDomain.requirements: domain.requirements
	
    console.log(oldDomain)

    try{
        var savedDomain = await oldDomain.save()
        return savedDomain;
    }catch(e){
        throw Error("And Error occurred while updating the Domain");
    }
}

exports.deleteDomain = async function(id){
    
    // Delete the Domain
    try{
        var deleted = await Domain.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Domain Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the Domain")
    }
}
