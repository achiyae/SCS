const express = require('express')
const models = require("./models"); //place on top of the file
const routes = require('./routes');
const path = require('path');
var errorhandler = require('errorhandler');

const app = express()
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

//  SYNC SCHEMA
models.sequelize.sync().then(function() {
  const server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});

// app.get('/', routes.index);
app.route('/')
  .get(function (req, res) {
    res.send('Birds home page')
  })
app.route('/user')
  .get(routes.getusers)
  .post(routes.saveusers)
app.route('/domain')
  .get(routes.getdomains)
  .post(routes.savedomains)
app.route('/requirement')
  .get(routes.getrequirements)
  .post(routes.saverequirements)
app.route('/annotation')
  .get(routes.getannotations)
  .post(routes.saveannotations)
