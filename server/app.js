const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const pagesRouter = require('./routes/pagesRoutes.js');
const homepageRouter = require('./routes/homepageRoutes.js');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
  }));
app.use(morgan('dev'));
app.use('/', pagesRouter, homepageRouter);
app.use(express.static(`${__dirname}/public`))

module.exports = app;
