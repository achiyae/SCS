var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var GroupSchema = new mongoose.Schema({
    name: String
})

GroupSchema.plugin(mongoosePaginate)
const Group = mongoose.model('Group', GroupSchema)

module.exports = Group;

