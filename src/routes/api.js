/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scraper = require('./utils/scrape');
const Class = require('../models/class');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello World!");
});

router.get('/classes', (req, res, next) => {
  Class.find({}, (err, classes) => {
    if(err) {
      return next({ error: 'Could not find classes' });
    }
    res.status(200).json(classes);
  });
});

router.post('/classes', scraper.scrapeClass);

router.get('/scrape', scraper.scrapeData);

module.exports = router;
