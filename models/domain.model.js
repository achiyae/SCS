// curl -H 'Content-Type: application/json' -d @models/domain.data.json -X POST http://localhost:3000/api/domain

var Requirement = require('./requirement.model')

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      name:   { type: String, required: true },
      description: { type: String, required: true },
//      requirements: [{ type: Schema.ObjectId, ref: 'Requirement' }]
      requirements: [Requirement.GetSchema()]
    });
    Model = mongoose.model('Domain', Schema);
    
// All -------------------------------------------------------------------
 
crud.entity('/domain').Create()
  .pipe(cm.createNew(Model)); 

crud.entity('/domain').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/domain').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/domain/:_id').Read()
  .pipe(cm.findOne(Model))
 
crud.entity('/domain/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/domain/:_id').Delete()
  .pipe(cm.removeOne(Model)); 

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
