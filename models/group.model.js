var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var GroupSchema = new mongoose.Schema({
    name: String
})

const Group = mongoose.model('Group', GroupSchema)
Group.registerRouter(router, '/api/v1/');

module.exports = Group;

