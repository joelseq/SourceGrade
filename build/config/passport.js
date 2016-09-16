'use strict';

var User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// Load .env file during dev
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = function (passport) {
  //============================
  // Local Strategy
  //============================
  var localOptions = {
    usernameField: 'username'
  };

  passport.use(new LocalStrategy(localOptions, function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      // User was found, compare passwords
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }));

  //==========================
  // JWT Strategy
  //==========================
  var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
  };

  passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};