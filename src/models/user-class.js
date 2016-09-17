const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userClassSchema = new Schema({
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
