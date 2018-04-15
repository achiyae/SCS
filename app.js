var bluebird = require('bluebird')

var createError = require('http-errors');
var crud = require('node-crud'),
    express = require('express'),
    app = express();
//var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')
//var db = mongoose.createConnection('mongodb:///opt/bitnami/mongodb/tmp/mongodb-27017.sock/scaapp');
//var db = mongoose.createConnection('mongodb://scaapp_menahel:vbRFg7WWx94TAvBdnw56@localhost/scapp');
mongoose.connect('mongodb://scaapp_menahel:vbRFg7WWx94TAvBdnw56@127.0.0.1/scaapp', { })
.then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1/scaapp')})
.catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1/scaapp')})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var apiRouter = require('./routes/api.route');
crud.launch(app);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(3000);

module.exports = app;
