/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scrape = require('utils/scrape');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello World!");
});

module.exports = router;