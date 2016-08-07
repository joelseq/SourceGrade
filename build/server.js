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

var app = express();

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//mongoose.connect(process.env.DB_URI);

require('./routes')(app);

app.get('/ping', function (req, res) {
	res.send('This route works!');
});

module.exports = app;