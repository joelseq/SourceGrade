const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  url: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
});

module.exports = mongoose.model('class', classSchema);
