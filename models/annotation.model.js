var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Annotation = mongoose.model('Annotation', new mongoose.Schema({
      position:    { type: Number, required: true },
      length:      { type: Number, required: true },
      requirement: { type: Schema.ObjectId, ref: 'Requirement', required: true }
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/annotation').Create()
  .pipe(cm.createNew(Annotation)); */

crud.entity('/annotation').Delete()
    .pipe(cm.removeAll(Annotation));
 
crud.entity('/annotation').Read()
  .pipe(cm.findAll(Annotation))

// One --------------------------------------------------------------------
 
crud.entity('/annotation/:_id').Read()
  .pipe(cm.findOne(Annotation))
 
crud.entity('/annotation/:_id').Update()
  .pipe(cm.updateOne(Annotation));
 
crud.entity('/annotation/:_id').Delete()
  .pipe(cm.removeOne(Annotation)); 

module.exports = Annotation;
