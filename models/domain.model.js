var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
//var mongoosePaginate = require('mongoose-paginate')

var DomainSchema = new mongoose.Schema({
    name: { type:String, index: true },
    description: String,
    requirements: [Requirement]
})

//DomainSchema.plugin(mongoosePaginate)
const Domain = mongoose.model('Domain', DomainSchema)
Domain.registerRouter(router, '/api/v1/');

module.exports = Domain;

