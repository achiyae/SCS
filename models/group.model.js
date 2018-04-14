var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Group = mongoose.model('Group', new mongoose.Schema({
      name:    { type: String, required: true, unique: true }
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/group').Create()
  .pipe(cm.createNew(Group)); 

crud.entity('/group').Delete()
    .pipe(cm.removeAll(Group));  */
 
crud.entity('/group').Read()
  .pipe(cm.findAll(Group))

// One --------------------------------------------------------------------
 
crud.entity('/group/:_id').Read()
  .pipe(cm.findOne(Group))
 
/* crud.entity('/group/:_id').Update()
  .pipe(cm.updateOne(Group));
 
crud.entity('/group/:_id').Delete()
  .pipe(cm.removeOne(Group)); */

module.exports = Group;
