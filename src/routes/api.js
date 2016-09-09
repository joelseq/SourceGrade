/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scraper = require('./utils/scrape');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello World!");
});

router.get('/scrape', scraper.scrapeData);

module.exports = router;