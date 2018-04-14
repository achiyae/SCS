var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    email: String,
    code: String,
    domain: Domain,
    phases: [Phase],
    annotations: [Annotation],
    group: Group
})

const User = mongoose.model('User', UserSchema)
User.registerRouter(router, '/api/v1/');

module.exports = User;