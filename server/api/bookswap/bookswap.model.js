'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookswapSchema = new Schema({
  name: String,
  author: String,
  info: String,
  publishedDate: Date,
  dateAdded: Date,
  genre: String,
  available: Boolean,
  owner: String,
  reservedBy: String,
  checkOutBy: String,
  status: String,
  dueDate: Date
});

module.exports = mongoose.model('Bookswap', BookswapSchema);