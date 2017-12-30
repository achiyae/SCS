const express = require('express')
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const errorhandler = require('errorhandler');

const models = require("./models/index"); //place on top of the file
const routes = require('./routes');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const app = express()
app.set('port', process.env.PORT || 3000);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'src')));

// development only
if (environment === 'development') {
  app.use(errorhandler())
}

//  SYNC SCHEMA
models.sequelize.sync().then(function() {
  if (environment === 'development') {
    var data = require('./models/data');
    data(models.sequelize);
  }

  const server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});

// app.get('/', routes.index);
app.route('/')
  .get(function (req, res) {
    res.send('Birds home page')
  });
app.route('/user')
  .get(routes.getuser);
app.route('/domain')
  .get(routes.getdomain);
app.route('/requirements')
  .get(routes.getrequirements);
app.route('/annotation')
  .get(routes.getannotations)
  .post(routes.saveannotation);
/*
app.route('/init')
  .post(routes.init);
*/
