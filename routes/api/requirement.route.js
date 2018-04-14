var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var RequirementController = require('../../controllers/requirement.controller');

// Map each API to the Controller FUnctions
router.get('/', UseController.getRequirements)
router.post('/', RequirementController.createRequirement)
router.put('/', RequirementController.updateRequirement)
router.delete('/:id',RequirementController.removeRequirement)

// Export the Router
module.exports = router;