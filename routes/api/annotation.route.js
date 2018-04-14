var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var AnnotationController = require('../../controllers/annotation.controller');

// Map each API to the Controller FUnctions
router.get('/', UseController.getAnnotations)
router.post('/', AnnotationController.createAnnotation)
router.put('/', AnnotationController.updateAnnotation)
router.delete('/:id',AnnotationController.removeAnnotation)

// Export the Router
module.exports = router;