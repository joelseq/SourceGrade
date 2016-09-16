const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Load .env file during dev
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = (passport) => {
  //============================
  // Local Strategy
  //============================
  const localOptions = {
    usernameField: username,
    passwordField: password
  };

  passport.use(new LocalStrategy(localOptions, (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if(err) { return done(err); }

      if(!user) { return done(null, false); }

      // User was found, compare passwords
      user.comparePassword(passowrd, (err, isMatch) => {
        if(err) { return done(err); }

        if(!isMatch) { return done(null, false) }

        return done(null, user);
      });
    });
  }));


  //==========================
  // JWT Strategy
  //==========================
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
  };

  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) {
      if(err) { return done(err, false); }

      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
