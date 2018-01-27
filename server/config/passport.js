const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

// Load .env file during dev
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line
}

module.exports = (passport) => {
  // Local Strategy
  const localOptions = {
    usernameField: 'username',
    passwordField: 'password',
  };

  passport.use(new LocalStrategy(localOptions, (username, password, done) => {
    return User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }

      if (!user) { return done(null, false); }

      // User was found, compare passwords
      return user.comparePassword(password, (error, isMatch) => {
        if (error) { return done(err); }

        if (!isMatch) { return done(null, false); }

        return done(null, user);
      });
    });
  }));


  // JWT Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET,
  };

  passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    return User.findById(payload.sub, (err, user) => {
      if (err) { return done(err, false); }

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};
