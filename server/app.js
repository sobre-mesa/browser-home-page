const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const homepageRouter = require('./routes/homepageRoutes.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
  }));
app.use(morgan('dev'));

app.use('/', homepageRouter);

app.use(express.static(`${__dirname}/public`))

module.exports = app;
