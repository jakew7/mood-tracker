var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//link controller
const moods = require('./routes/moods');
const auth = require('./routes/auth');

var app = express();


//if not in production mode use env
if (process.env.NODE_ENV !=='production') {
  require('dotenv').config()
}

// passport config
const passport = require('passport')
const session = require('express-session')


//  enable the session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true ,
  saveUninitialized: false
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// link user model and enable local auth
let User = require('./models/user')
passport.use(User.createStrategy()) 

// set up passport to read and write user data
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// mongoose connection
const mongoose = require('mongoose')

//connect now
mongoose.connect(process.env.DATABASE_URL,{
}).then((res) =>{
  console.log('Connected to MongoDB')
}).catch(() => {
  console.log('MongoDB connection failed')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// maps url to routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/moods', moods);
app.use('/auth', auth);


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

module.exports = app;
