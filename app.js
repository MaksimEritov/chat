/**
 * NPM package
 * 
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const mongoose = require('./db/dbconection')


/**
 * Server setup
 * 
 */
const app = express();
const server = http.createServer(app);
port = process.env.PORT || 80
server.listen(port, function() {
  console.log('Listening on ' + port);
})


/**
 *  Express setup
 *  engine ejs
 * 
 */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Router modules
 * 
 */
app.use(require('./routes/index'));

app.use(function(err, req, res, next) {
  if(401 == err.status) {
      res.redirect('/signin')
  }
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


/**
 * Socket setup
 * 
 */

require('./socket/socket')(server)

/**
 * User model
 * 
 */

require('./models/UserSchema');
require('./config/passport');
