/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Design = require('./design.model');

exports.register = function(socket) {
  Design.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Design.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('design:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('design:remove', doc);
}