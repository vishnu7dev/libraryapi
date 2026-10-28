const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("book", bookSchema);




















































    