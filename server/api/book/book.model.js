'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  author: String,
  info: String,
  publishedDate: Date,
  dateAdded: Date,
  genre: String,
  available: Boolean,
  reservedBy: String,
  checkOutBy: String,
  status: String,
  dueDate: Date
});

module.exports = mongoose.model('Book', BookSchema);