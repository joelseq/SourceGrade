/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scraper = require('./utils/scrape');
const Class = require('../models/class');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

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

router.get('/me/classes', requireAuth, (req, res, next) => {
  User.findById(req.user._id).populate('classes.course').exec((err, user) => {
    if(err) {
      return next({ error: 'Could not find classes for user' });
    }
    res.status(200).json(user.classes);
  });
});

router.post('/me/classes', requireAuth, (req, res, next) => {
  Class.findOne({courseName: req.body.name}, (err, foundClass) => {
    if(err) {
      return next({ error: 'Could not find class'});
    }
    User.findById(req.user._id, (err, user) => {
      if(err) {
        return next({ error: 'Something went wrong'});
      }
      user.classes.push({ course: foundClass, id: req.body.id });
      user.save();
      res.status(201).json({ message: 'Successfully added class to user' });
    });
  });
});

router.get('/scrape', scraper.scrapeData);

module.exports = router;
