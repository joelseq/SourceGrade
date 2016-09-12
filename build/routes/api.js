'use strict';

/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
var express = require('express');
var scraper = require('./utils/scrape');

var router = express.Router();

router.get('/', function (req, res) {
  res.send("Hello World!");
});

router.get('/scrape', scraper.scrapeData);

module.exports = router;