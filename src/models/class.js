const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  courseName: { type: String, unique: true }
});

module.exports = mongoose.model('class', classSchema);
