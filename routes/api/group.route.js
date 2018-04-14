var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var GroupController = require('../../controllers/group.controller');

// Map each API to the Controller FUnctions
router.get('/', UseController.getGroups)
router.post('/', GroupController.createGroup)
router.put('/', GroupController.updateGroup)
router.delete('/:id',GroupController.removeGroup)

// Export the Router
module.exports = router;