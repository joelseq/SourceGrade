'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
  courseName: { type: String, required: true, unique: true },
  url: { type: String, required: true }
});

module.exports = mongoose.model('class', classSchema);