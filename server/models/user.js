const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String,
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user-class',
    },
  ],
});

// Generate a hash
userSchema.pre('save', (next) => {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      return bcrypt.hash(user.password, salt, () => {}, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        return next();
      });
    });
  }

  return next();
});

// Method to compare password input to password saved in DB
userSchema.methods.comparePassword = (pw, cb) => {
  return bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
