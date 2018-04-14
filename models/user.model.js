var crud = require('crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    User = mongoose.model('User', new mongoose.Schema({
      email:       { type: String, required: true, unique: true },
      code:        { type: String, required: true },
      domain:      { type: Domain, required: true },
      phases:      [Phase],
      annotations: [Annotation],
      group:       { type: Group, required: true },
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/user').Create()
  .pipe(cm.createNew(User)); 

crud.entity('/user').Delete()
    .pipe(cm.removeAll(User));  */
 
crud.entity('/user').Read()
  .pipe(cm.findAll(User))

// One --------------------------------------------------------------------
 
crud.entity('/user/:_id').Read()
  .pipe(cm.findOne(User))
 
crud.entity('/user/:_id').Update()
  .pipe(cm.updateOne(User));
 
crud.entity('/user/:_id').Delete()
  .pipe(cm.removeOne(User)); 

module.exports = User;
