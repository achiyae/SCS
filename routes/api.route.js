var express = require('express')
var router = express.Router()

// https://github.com/uhray/crud-mongoose
var requirement = require('../models/requirement.model')
var annoatation = require('../models/annotation.model')
var phase = require('../models/phase.model')
var domain = require('../models/domain.model')
var group = require('../models/group.model')
var user = require('../models/user.model')

module.exports = router;