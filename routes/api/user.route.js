var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var UserController = require('../../controllers/user.controller');

// Map each API to the Controller FUnctions
router.get('/', UseController.getUsers)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/:id',UserController.removeUser)

// Export the Router
module.exports = router;