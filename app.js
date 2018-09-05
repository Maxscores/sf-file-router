var express = require('express');
var apiV1FileRouter = require('./routes/api/v1/files');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');


var app = express();

app.set('view engine', 'ejs');

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/files', apiV1FileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'this page does not exist'));
});

// allow certain urls
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
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

app.listen(3000, () => console.log('listening on port 3000'));

module.exports = app;
