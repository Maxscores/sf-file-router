var express = require('express');
var apiV1FileRouter = require('./routes/api/v1/files');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser");


var app = express();

app.set('view engine', 'ejs');

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/v1/files', apiV1FileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'this page does not exist'));
});

// allow certain urls
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://max-bluewavememberportal.cs25.force.com");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "username, token, parentId, fileName, content-type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
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
