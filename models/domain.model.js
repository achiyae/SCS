var crud = require('crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    Domain = mongoose.model('Domain', new mongoose.Schema({
      name:   { type: String, required: true },
      description: { type: String, required: true },
      requirements: [Requirement]
    }));

// All -------------------------------------------------------------------
 
/* crud.entity('/domain').Create()
  .pipe(cm.createNew(Domain)); 

crud.entity('/domain').Delete()
    .pipe(cm.removeAll(Domain));  */
 
crud.entity('/domain').Read()
  .pipe(cm.findAll(Domain))

// One --------------------------------------------------------------------
 
crud.entity('/domain/:_id').Read()
  .pipe(cm.findOne(Domain))
 
crud.entity('/domain/:_id').Update()
  .pipe(cm.updateOne(Domain));
 
crud.entity('/domain/:_id').Delete()
  .pipe(cm.removeOne(Domain)); 

module.exports = Domain;
