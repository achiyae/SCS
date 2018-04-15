var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      name:    { type: String, required: true, unique: true }
    });
    Model = mongoose.model('group', Schema);

// All -------------------------------------------------------------------
 
crud.entity('/group').Create()
  .pipe(cm.createNew(Model)); 

crud.entity('/group').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/group').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/group/:_id').Read()
  .pipe(cm.findOne(Model))
 
crud.entity('/group/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/group/:_id').Delete()
  .pipe(cm.removeOne(Model));

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
