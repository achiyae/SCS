var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var DomainController = require('../../controllers/domain.controller');

// Map each API to the Controller FUnctions
router.get('/', UseController.getDomains)
router.post('/', DomainController.createDomain)
router.put('/', DomainController.updateDomain)
router.delete('/:id',DomainController.removeDomain)

// Export the Router
module.exports = router;