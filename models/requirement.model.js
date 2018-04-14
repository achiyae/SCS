var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Requirement = mongoose.model('Requirement', new mongoose.Schema({
      rid:         { type: String, required: true },
      description: String
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/requirement').Create()
  .pipe(cm.createNew(Requirement)); 

crud.entity('/requirement').Delete()
    .pipe(cm.removeAll(Requirement));  */
 
crud.entity('/requirement').Read()
  .pipe(cm.findAll(Requirement))

// One --------------------------------------------------------------------
 
crud.entity('/requirement/:_id').Read()
  .pipe(cm.findOne(Requirement))
 
crud.entity('/requirement/:_id').Update()
  .pipe(cm.updateOne(Requirement));
 
crud.entity('/requirement/:_id').Delete()
  .pipe(cm.removeOne(Requirement)); 

module.exports = Requirement;
