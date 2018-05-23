// POST exampl
// curl --data-urlencode email=achiya@post.bgu.ac.il --data-urlencode domain=ATM --data-urlencode group=USERS  -X POST http://localhost:3000/user

// var Domain = require('./requirement.model')
var Group = require('./group.model')
var Phase = require('./phase.model')
var Annotation = require('./annotation.model')

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      email:       { type: String, required: true, unique: true },
      code:        { type: String },
      domain:      { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
      phases:      [Phase.GetSchema()],
      annotations: [Annotation.GetSchema()],
      group:       { type:  mongoose.Schema.Types.ObjectId, ref: 'Group' },
      hash: String,
      salt: String
    });
    Model = mongoose.model('User', Schema);
    /*Schema.pre('find', function(next) {
       this.populate('group');
    });*/
    
// All -------------------------------------------------------------------
   
crud.entity('/user').Create()
  .pipe(cm.createNew(Model)); 

crud.entity('/user').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/user').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/user/:_id').Read()
  .pipe(cm.findOne(Model))
  .pipe(function(data, query, cb) {
	var opts = [
          { path: 'group', select: 'name' }
	]
	Model.populate(data,opts,function (err, data) {
	    cb(err, data);
        });
   });

crud.entity('/user/:_id/group').Read()
  .pipe(cm.findOne(Model))
  .pipe(function(data, query, cb) {
	var opts = [
          { path: 'group', select: 'name' }
	]
	Model.populate(data,opts,function (err, data) {
	    cb(err, data.group);
        });
   });

crud.entity('/user/:_id/domain').Read()
  .pipe(cm.findOne(Model))
  .pipe(function(data, query, cb) {
	var opts = [
          { path: 'domain' }
	]
	Model.populate(data,opts,function (err, user) {
	    cb(err, user.domain);
        });
   });
 
crud.entity('/user/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/user/:_id').Delete()
  .pipe(cm.removeOne(Model)); 

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
