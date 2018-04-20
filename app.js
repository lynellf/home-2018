var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var database = require('mongoose');

var index = require('./routes/index');
var admin = require('./routes/admin');
var auth = require('./routes/auth-controller');
var post = require('./routes/post-controller');
var skill = require('./routes/skill-controller');
var user = require('./routes/user-controller');
var about = require('./routes/about-controller');
var files = require('./routes/file-controller');
var navigation = require('./routes/navigation-controller');

var app = express();
var store = database.connection;
var port = 3000;


// Database listening
database.connect(`mongodb://localhost:27017/ezell-cms`, () =>
  console.log(`The database has initiated on port 27017`)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Use sessions for tracking all request objects
app.use(session({
    secret: 'Ezell Frazier dot com',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: store,
    }),
}));

app.use('/', index);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/about', about);
app.use('/nav', navigation);
app.use('/post', post);
app.use('/files', files);
app.use('/skill', skill);
app.use('/css', express.static('css'));
app.use('/img', express.static('front-end/build/img'));
app.use('/static', express.static('front-end/build/static'));
app.use('/drop-styles', express.static('node_modules/bootstrap4c-dropzone'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

// Port Listening
app.listen( port, () => console.log(`The API is listening on port ${port}`));
module.exports = app;
