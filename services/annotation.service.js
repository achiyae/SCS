// Getting the Newly created Mongoose Model we just created 
var Annotation = require('../models/annotation.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getAnnotations = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var annotations = await Annotation.paginate(query, options)
        
        // Return the annotation list that was returned by the mongoose promise
        return annotations;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Annotations')
    }
}

exports.createAnnotation = async function(annotation){
    
    // Creating a new Mongoose Object by using the new keyword
    var newAnnotation = new Annotation({
		position: annotation.position,
		length: annotation.length,
		requirement: annotation.requirement
    })

    try{

        // Saving the Annotation
        var savedAnnotation = await newAnnotation.save()

        return savedAnnotation;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Annotation")
    }
}

exports.updateAnnotation = async function(annotation){
    var id = annotation.id

    try{
        //Find the old Annotation Object by the Id
    
        var oldAnnotation = await Annotation.findById(id);
    }catch(e){
        throw Error("Error occurred while Finding the Annotation")
    }

    // If no old Annotation Object exists return false
    if(!oldAnnotation){
        return false;
    }

    console.log(oldAnnotation)

    //Edit the Annotation Object
	oldAnnotation.position: annotation.position
	oldAnnotation.length: annotation.length
	oldAnnotation.requirement: annotation.requirement
	
    console.log(oldAnnotation)

    try{
        var savedAnnotation = await oldAnnotation.save()
        return savedAnnotation;
    }catch(e){
        throw Error("And Error occurred while updating the Annotation");
    }
}

exports.deleteAnnotation = async function(id){
    
    // Delete the Annotation
    try{
        var deleted = await Annotation.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Annotation Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occurred while Deleting the Annotation")
    }
}
