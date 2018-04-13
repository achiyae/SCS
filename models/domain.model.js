var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var DomainSchema = new mongoose.Schema({
    name: { type:String, index: true },
    description: String,
    requirements: [Requirement]
})

DomainSchema.plugin(mongoosePaginate)
const Domain = mongoose.model('Domain', DomainSchema)

module.exports = Domain;

