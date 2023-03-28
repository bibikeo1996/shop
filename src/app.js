require('dotenv').config();
const compression = require('compression'); // => Compress all data to save Bandwith
const express = require('express');
const { default: helmet } = require('helmet'); // => hide all important information from Header
const morgan = require('morgan');
const app = express();

// init Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extends: true
}));

// init DB
require('./dbs/init.mongodb');
const { countConnect, checkOverLoad } = require('./helper/check.connect');
// checkOverLoad();


// init router
app.use('', require('./routers'))

// handle error

module.exports = app