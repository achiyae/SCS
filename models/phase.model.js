var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var PhaseSchema = new mongoose.Schema({
    name: String,
    done: Boolean
})

const Phase = mongoose.model('Phase', PhaseSchema)
Phase.registerRouter(router, '/api/v1/');

module.exports = Phase;

