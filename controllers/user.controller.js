// Accessing the Service that we just created

var UserService = require('../services/user.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var users = await UserService.getUsers({}, page, limit)
        
        // Return the users list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: users, message: "Received Users Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createUser = async function(req, res, next){

    // Req.Body contains the form submit values.

    var user = {
        email: req.body.email,
        code: req.body.code,
        domain: req.body.domain,
		phases: req.body.phases,
		annotations: req.body.annotations
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Created User Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "User Creation Failed"})
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
	id,
	email: req.body.email ? req.body.email : null,
        code: req.body.code ? req.body.code : null,
        domain: req.body.domain ? req.body.domain : null,
	phases: req.body.phases ? req.body.phases : null,
	annotations: req.body.annotations ? req.body.annotations : null,
	group: req.body.group ? req.body.group : null
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Updated User Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "User Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
