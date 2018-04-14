var express = require('express')
var router = express.Router()

var annoatation = require('./api/annotation.route')
router.use('/annotation', annotations);

var phase = require('./api/phase.route')
router.use('/phase', phases);

var domain = require('./api/domain.route')
router.use('/domain', domains);

var group = require('./api/group.route')
router.use('/group', groups);

var requirement = require('./api/requirement.route')
router.use('/requirement', requirements);

var user = require('./api/user.route')
router.use('/user', users);

module.exports = router;