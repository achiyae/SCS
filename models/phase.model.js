var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Phase = mongoose.model('Phase', new mongoose.Schema({
      name: { type: String, required: true, match: '[home|instructions|user|domain|code|annotate_.*]' },
      done: { type: Boolean, required: true }
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/phase').Create()
  .pipe(cm.createNew(Phase));  */

crud.entity('/phase').Delete()
    .pipe(cm.removeAll(Phase));
 
crud.entity('/phase').Read()
  .pipe(cm.findAll(Phase))

// One --------------------------------------------------------------------
 
crud.entity('/phase/:_id').Read()
  .pipe(cm.findOne(Phase))
 
crud.entity('/phase/:_id').Update()
  .pipe(cm.updateOne(Phase));
 
crud.entity('/phase/:_id').Delete()
  .pipe(cm.removeOne(Phase)); 

module.exports = Phase;
