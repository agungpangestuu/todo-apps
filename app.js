const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config()

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URL, { useMongoClient: true });


const app = express();


app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/signin'))
app.use('/api', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
  console.log(err)
  res.send(err);
});

module.exports = app;
