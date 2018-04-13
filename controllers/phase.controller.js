// Accessing the Service that we just created

var PhaseService = require('../services/phase.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getPhases = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var phases = await PhaseService.getPhases({}, page, limit)
        
        // Return the phases list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: phases, message: "Received Phases Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createPhase = async function(req, res, next){

    // Req.Body contains the form submit values.

    var phase = {
        name: req.body.name,
        done: req.body.done
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdPhase = await PhaseService.createPhase(phase)
        return res.status(201).json({status: 201, data: createdPhase, message: "Created Phase Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Phase Creation Failed"})
    }
}

exports.updatePhase = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var phase = {
		id,
		name: req.body.name ? req.body.name : null,
        done: req.body.done ? req.body.done : null
    }

    try{
        var updatedPhase = await PhaseService.updatePhase(phase)
        return res.status(200).json({status: 200, data: updatedPhase, message: "Updated Phase Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePhase = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PhaseService.deletePhase(id)
        return res.status(204).json({status:204, message: "Phase Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
