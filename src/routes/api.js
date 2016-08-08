/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scraper = require('./utils/scrape');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello World!");
});

router.get('/scrape', scraper.scrapeData);


module.exports = router;