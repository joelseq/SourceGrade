"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userClassSchema = new Schema({
  id: String,
  class: {
    type: Schema.Types.ObjectId,
    ref: "class"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model('user-class', userClassSchema);