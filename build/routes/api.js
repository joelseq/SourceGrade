'use strict';

/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
var express = require('express');
var scraper = require('./utils/scrape');
var Class = require('../models/class');
var User = require('../models/user');
var UserClass = require('../models/user-class');
var passport = require('passport');

var router = express.Router();

var requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', function (req, res) {
  res.send("Hello World!");
});

router.get('/classes', function (req, res, next) {
  Class.find({}, function (err, classes) {
    if (err) {
      return next({ error: 'Could not find classes' });
    }
    res.status(200).json(classes);
  });
});

router.post('/classes', scraper.scrapeClass);

router.get('/me/classes', requireAuth, function (req, res, next) {
  UserClass.find({ user: req.user }).populate('class').exec(function (err, classes) {
    if (err) {
      return next({ error: 'Could not find classes for user' });
    }

    res.status(200).json(classes);
  });
});

router.post('/me/classes', requireAuth, function (req, res, next) {
  Class.findOne({ courseName: req.body.name }, function (err, foundClass) {
    if (err) {
      return next({ error: 'Could not find class' });
    }
    User.findById(req.user._id, function (err, user) {
      if (err) {
        return next({ error: 'Something went wrong' });
      }
      UserClass.create({ id: req.body.id, class: foundClass, user: user }, function (err, created) {
        if (err) {
          return next({ error: 'Could not create class for user' });
        }

        user.classes.push(created);
        user.save();
        res.status(201).json({ message: 'Successfully added class to user' });
      });
    });
  });
});

router.delete('/me/classes/:id', requireAuth, function (req, res, next) {
  UserClass.findOneAndRemove({ _id: req.params.id, user: req.user }, function (err, removed) {
    if (err) {
      return next({ error: 'Could not remove class' });
    }

    if (!removed) {
      return next({ error: 'No class to remove' });
    }

    res.status(200).json(removed);
  });
});

router.get('/scrape', scraper.scrapeData);

module.exports = router;