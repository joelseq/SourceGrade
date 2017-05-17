'use strict';

var jwt = require('jwt-simple');
var User = require('../models/user');
var router = require('express').Router();
var passport = require('passport');
require('../config/passport')(passport); // passport configs

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

var requireLogin = passport.authenticate('local', { session: false });

router.post('/login', requireLogin, function (req, res, next) {
  res.json({ token: tokenForUser(req.user) });
});

router.post('/signup', function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;


  if (!username || !password) {
    res.status(422).send({ error: 'You must provide a username and password' });
  }

  User.findOne({ username: username }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Username is already taken' });
    }

    var user = new User({
      username: username,
      password: password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    });
  });
});

module.exports = router;