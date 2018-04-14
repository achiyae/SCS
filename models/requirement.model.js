var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
//var mongoosePaginate = require('mongoose-paginate')


var RequirementSchema = new mongoose.Schema({
    rid: String,
    description: String
})

//RequirementSchema.plugin(mongoosePaginate)
const Requirement = mongoose.model('Requirement', RequirementSchema)
Requirement.registerRouter(router, '/api/v1/');

module.exports = Requirement;

