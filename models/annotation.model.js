//var Requirement = require('./requirement.model')

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      position:    { type: Number, required: true },
      length:      { type: Number, required: true },
      requirement: { type: mongoose.Schema.Types.ObjectId, ref: 'Requirement' }
      //requirement: Requirement.GetSchema()
    });
    Model = mongoose.model('Annotation', Schema);

// All -------------------------------------------------------------------
 
crud.entity('/annotation').Create()
  .pipe(cm.createNew(Model));

crud.entity('/annotation').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/annotation').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/annotation/:_id').Read()
  .pipe(cm.findOne(Model))
 
crud.entity('/annotation/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/annotation/:_id').Delete()
  .pipe(cm.removeOne(Model)); 

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
