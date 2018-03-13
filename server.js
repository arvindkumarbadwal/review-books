// Load environment variables from .env file
require('dotenv').config();
global.__base = __dirname + '/';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var nunjucks = require('nunjucks');
var passport = require('passport');

var app = express();

//helper function
require('./helpers/functions');

//Database connection
require('./libs/database');

// Passport OAuth strategies
require('./libs/passport');

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: true, saveUninitialized: true, 
  store: new MongoStore({
    url: process.env.MONGODB,
    ttl: 60 * 60
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./libs/routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
