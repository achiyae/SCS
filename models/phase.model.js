var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema({
      name: { type: String, required: true, match: '[home|instructions|user|domain|code|annotate_.*]' },
      done: { type: Boolean, required: true }
    });
    Model = mongoose.model('Phase', Schema);

// All -------------------------------------------------------------------
 
crud.entity('/phase').Create()
  .pipe(cm.createNew(Model));

crud.entity('/phase').Delete()
    .pipe(cm.removeAll(Model));
 
crud.entity('/phase').Read()
  .pipe(cm.findAll(Model))

// One --------------------------------------------------------------------
 
crud.entity('/phase/:_id').Read()
  .pipe(cm.findOne(Model))
 
crud.entity('/phase/:_id').Update()
  .pipe(cm.updateOne(Model));
 
crud.entity('/phase/:_id').Delete()
  .pipe(cm.removeOne(Model)); 

module.exports = {
  GetModel: function() { return Model;  },
  GetSchema: function() { return Schema;  },
}
