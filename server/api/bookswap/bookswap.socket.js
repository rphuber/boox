/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bookswap = require('./bookswap.model');

exports.register = function(socket) {
  Bookswap.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bookswap.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bookswap:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bookswap:remove', doc);
}