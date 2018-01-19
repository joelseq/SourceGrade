const mongoose = require('mongoose');

const userClassSchema = new mongoose.Schema({
  id: String,
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'class',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('user-class', userClassSchema);
