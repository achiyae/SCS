// Accessing the Service that we just created

var DomainService = require('../services/domain.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getDomains = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var domains = await DomainService.getDomains({}, page, limit)
        
        // Return the domains list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: domains, message: "Received Domains Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createDomain = async function(req, res, next){

    // Req.Body contains the form submit values.

    var domain = {
        name: req.body.name,
        description: req.body.description,
        requirements: req.body.requirements
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdDomain = await DomainService.createDomain(domain)
        return res.status(201).json({status: 201, data: createdDomain, message: "Created Domain Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Domain Creation Failed"})
    }
}

exports.updateDomain = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var domain = {
	id,
	name: req.body.name ? req.body.name : null,
        description: req.body.description ? req.body.description : null,
        requirements: req.body.requirements ? req.body.requirements : null
    }

    try{
        var updatedDomain = await DomainService.updateDomain(domain)
        return res.status(200).json({status: 200, data: updatedDomain, message: "Updated Domain Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeDomain = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await DomainService.deleteDomain(id)
        return res.status(204).json({status:204, message: "Domain Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
