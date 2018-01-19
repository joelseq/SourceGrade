'use strict';

/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var errorHandler = require('./errorHandler');
var RateLimit = require('express-rate-limit');

var app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

var limiter = new RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
// Allowing CORS
app.use(function (req, res, next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.enable('trust proxy');
app.use(limiter);

mongoose.connect(process.env.DB_URI, {
	useMongoClient: true
});

require('./routes')(app);

// After all routes, use errorHandler to catch all errors
app.use(errorHandler);

// To make browserHistory work for ReactJS
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

module.exports = app;