const mongoose = require('mongoose');

const CommentsShema = new mongoose.Schema({
  author: String,
  text: String,
});

module.exports = mongoose.model('comment', CommentsShema);
