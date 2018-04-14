var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var AnnotationSchema = new mongoose.Schema({
    position: Number,
    length: Number,
    requirement: Requirement
})

const Annotation = mongoose.model('Annotation', AnnotationSchema)
Annotation.registerRouter(router, '/api/v1/');

module.exports = Annotation;
