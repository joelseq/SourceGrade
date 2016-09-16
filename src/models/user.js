const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String
});

userSchema.pre('save', (next) => {
  const user = this;

  bcrypt.getSalt(10, (err, salt) => {
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
