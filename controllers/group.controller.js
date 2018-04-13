// Accessing the Service that we just created

var GroupService = require('../services/group.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getGroups = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var groups = await GroupService.getGroups({}, page, limit)
        
        // Return the groups list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: groups, message: "Received Groups Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createGroup = async function(req, res, next){

    // Req.Body contains the form submit values.

    var group = {
        name: req.body.name
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdGroup = await GroupService.createGroup(group)
        return res.status(201).json({status: 201, data: createdGroup, message: "Created Group Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Group Creation Failed"})
    }
}

exports.updateGroup = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var group = {
		id,
		name: req.body.name ? req.body.name : null
    }

    try{
        var updatedGroup = await GroupService.updateGroup(group)
        return res.status(200).json({status: 200, data: updatedGroup, message: "Updated Group Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeGroup = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await GroupService.deleteGroup(id)
        return res.status(204).json({status:204, message: "Group Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
