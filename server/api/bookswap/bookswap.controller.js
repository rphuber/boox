'use strict';

var _ = require('lodash');
var Bookswap = require('./bookswap.model');

// Get list of bookswaps
exports.index = function(req, res) {
  Bookswap.find(function (err, bookswaps) {
    if(err) { return handleError(res, err); }
    return res.json(200, bookswaps);
  });
};

// Get a single bookswap
exports.show = function(req, res) {
  Bookswap.findById(req.params.id, function (err, bookswap) {
    if(err) { return handleError(res, err); }
    if(!bookswap) { return res.send(404); }
    return res.json(bookswap);
  });
};

// Creates a new bookswap in the DB.
exports.create = function(req, res) {
  Bookswap.create(req.body, function(err, bookswap) {
    if(err) { return handleError(res, err); }
    return res.json(201, bookswap);
  });
};

// Updates an existing bookswap in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bookswap.findById(req.params.id, function (err, bookswap) {
    if (err) { return handleError(res, err); }
    if(!bookswap) { return res.send(404); }
    var updated = _.merge(bookswap, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bookswap);
    });
  });
};

// Deletes a bookswap from the DB.
exports.destroy = function(req, res) {
  Bookswap.findById(req.params.id, function (err, bookswap) {
    if(err) { return handleError(res, err); }
    if(!bookswap) { return res.send(404); }
    bookswap.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}