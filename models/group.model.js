var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
//var mongoosePaginate = require('mongoose-paginate')

var GroupSchema = new mongoose.Schema({
    name: String
})

//GroupSchema.plugin(mongoosePaginate)
const Group = mongoose.model('Group', GroupSchema)
Group.registerRouter(router, '/api/v1/');

module.exports = Group;

