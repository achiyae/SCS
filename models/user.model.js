var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User', new mongoose.Schema({
      email:       { type: String, required: true, unique: true },
      code:        { type: String, required: true },
      domain:      { type: Schema.ObjectId, ref: 'Domain', required: true },
      phases:      [{ type: Schema.ObjectId, ref: 'Phase' }],
      annotations: [{ type: Schema.ObjectId, ref: 'Annotation' }],
      group:       { type: Schema.ObjectId, ref: 'Group', required: true },
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
