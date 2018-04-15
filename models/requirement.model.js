var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      rid:         { type: String, required: true },
      description: String
    });
    Model = mongoose.model('Requirement', Schema);

// All -------------------------------------------------------------------
 
crud.entity('/requirement').Create()
  .pipe(cm.createNew(Model)); 

crud.entity('/requirement').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/requirement').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/requirement/:_id').Read()
  .pipe(cm.findOne(Model))
 
crud.entity('/requirement/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/requirement/:_id').Delete()
  .pipe(cm.removeOne(Model)); 

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
