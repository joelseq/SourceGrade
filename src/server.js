/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allowing CORS
app.use(function(req,res,next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//mongoose.connect(process.env.DB_URI);

require('./routes')(app);

module.exports = app;