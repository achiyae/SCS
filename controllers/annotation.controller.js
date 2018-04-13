// Accessing the Service that we just created

var AnnotationService = require('../services/annotation.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getAnnotations = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var annotations = await AnnotationService.getAnnotations({}, page, limit)
        
        // Return the annotations list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: annotations, message: "Received Annotations Successfully"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createAnnotation = async function(req, res, next){

    // Req.Body contains the form submit values.

    var annotation = {
        position: req.body.position,
        length: req.body.length,
        requirement: req.body.requirement
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdAnnotation = await AnnotationService.createAnnotation(annotation)
        return res.status(201).json({status: 201, data: createdAnnotation, message: "Created Annotation Successfully"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Annotation Creation Failed"})
    }
}

exports.updateAnnotation = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var annotation = {
	id,
	position: req.body.position ? req.body.position : null,
        length: req.body.length ? req.body.length : null,
        requirement: req.body.requirement ? req.body.requirement : null
    }

    try{
        var updatedAnnotation = await AnnotationService.updateAnnotation(annotation)
        return res.status(200).json({status: 200, data: updatedAnnotation, message: "Updated Annotation Successfully"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeAnnotation = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await AnnotationService.deleteAnnotation(id)
        return res.status(204).json({status:204, message: "Annotation Deleted Successfully"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
