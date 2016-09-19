const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  courseName: { type: String, required: true },
  url: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('class', classSchema);
