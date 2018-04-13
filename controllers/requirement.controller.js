// Accessing the Service that we just created

var RequirementService = require('../services/requirement.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getRequirements = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var requirements = await RequirementService.getRequirements({}, page, limit)
        
        // Return the requirements list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: requirements, message: "Received Requirements Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createRequirement = async function(req, res, next){

    // Req.Body contains the form submit values.

    var requirement = {
        rid: req.body.rid,
        description: req.body.description
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdRequirement = await RequirementService.createRequirement(requirement)
        return res.status(201).json({status: 201, data: createdRequirement, message: "Created Requirement Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Requirement Creation Failed"})
    }
}

exports.updateRequirement = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var requirement = {
		id,
		rid: req.body.rid ? req.body.rid : null,
        description: req.body.description ? req.body.description : null
    }

    try{
        var updatedRequirement = await RequirementService.updateRequirement(requirement)
        return res.status(200).json({status: 200, data: updatedRequirement, message: "Updated Requirement Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeRequirement = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await RequirementService.deleteRequirement(id)
        return res.status(204).json({status:204, message: "Requirement Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
