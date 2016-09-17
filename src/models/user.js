const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String,
  classes: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: "class"
      },
      id: String
    }
  ]
});

// Generate a hash
userSchema.pre('save', function(next) {
  let user = this;
  if( this.isModified('password') || this.isNew ) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Method to compare password input to password saved in DB
userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
