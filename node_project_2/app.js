var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://new-user_31:password1234@cluster0.oqwop.mongodb.net/mydb1?retryWrites=true&w=majority', {useNewUrlParser: true});

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var blogsRouter = require('./routes/create');
var submitRouter = require('./routes/submit');


var app = express();

// connect to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/', indexRouter);
    app.use('/about', aboutRouter);
    app.use('/blogs', blogsRouter);
    app.use('/blogs', submitRouter);
    
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
});




module.exports = app;
