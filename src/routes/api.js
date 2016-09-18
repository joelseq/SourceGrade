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
const UserClass = require('../models/user-class');
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
  UserClass.find({user: req.user}).populate('class').exec((err, classes) => {
    if(err) { return next({ error: 'Could not find classes for user' }); }

    res.status(200).json(classes);
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
      UserClass.create({id: req.body.id, class: foundClass, user: user}, (err, created) => {
        if(err) { return next({ error: 'Could not create class for user' }); }

        user.classes.push(created);
        user.save();
        res.status(201).json({ message: 'Successfully added class to user' });
      });
    });
  });
});

router.delete('/me/classes/:id', requireAuth, (req, res, next) => {
  UserClass.findOneAndRemove({ _id: req.params.id, user: req.user}, (err, removed) => {
    if(err) {
      return next({ error: 'Could not remove class'});
    }

    if(!removed) {
      return next({ error: 'No class to remove'});
    }

    res.status(200).json(removed);
  });
});

router.get('/scrape', scraper.scrapeData);

module.exports = router;
