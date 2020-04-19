var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')

var clothingRouter = require('./routes/clothing');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

// Load env variables
require('dotenv').config();

var app = express();

app.use(cors());
app.use(helmet());

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Only use logger when testing
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))

app.use('/v1/clothing', clothingRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler for development
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

// error handler for production
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
