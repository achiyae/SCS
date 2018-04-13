var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var AnnotationSchema = new mongoose.Schema({
    position: Number,
    length: Number,
    requirement: Requirement
})

AnnotationSchema.plugin(mongoosePaginate)
const Annotation = mongoose.model('Annotation', AnnotationSchema)

module.exports = Annotation;
