var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');   //  ADD THIS

require('dotenv').config();

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

const hbs = require('hbs');
// centralized error handler 
const errorHandler = require('./app_api/middleware/errorHandler');

// DB
require('./app_api/models/db');

// Passport config (if your file exists)
require('./app_api/config/passport');   //  ADD THIS (IMPORTANT)

var app = express();

// =======================
// VIEW ENGINE SETUP
// =======================
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// =======================
// MIDDLEWARE
// =======================
app.use(logger('dev'));

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());   //  ADD THIS (CRITICAL FIX)

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// ROUTES
// =======================
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// =======================
// 404 HANDLER
// =======================
app.use(function(req, res, next) {
  next(createError(404));
});

// =======================
// API ERROR HANDLER
// =======================
app.use('/api', errorHandler);

// =======================
// WEBSITE ERROR HANDLER
// =======================
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;