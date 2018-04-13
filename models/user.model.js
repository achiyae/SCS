var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    email: String,
    code: String,
    domain: Domain,
    phases: [Phase],
    annotations: [Annotation],
    group: Group
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;

