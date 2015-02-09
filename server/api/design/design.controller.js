'use strict';

var _ = require('lodash');
var Design = require('./design.model');

// Get list of designs
exports.index = function(req, res) {
  Design.find(function (err, designs) {
    if(err) { return handleError(res, err); }
    return res.json(200, designs);
  });
};

// Get a single design
exports.show = function(req, res) {
  Design.findById(req.params.id, function (err, design) {
    if(err) { return handleError(res, err); }
    if(!design) { return res.send(404); }
    return res.json(design);
  });
};

// Creates a new design in the DB.
exports.create = function(req, res) {
  Design.create(req.body, function(err, design) {
    if(err) { return handleError(res, err); }
    return res.json(201, design);
  });
};

// Updates an existing design in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Design.findById(req.params.id, function (err, design) {
    if (err) { return handleError(res, err); }
    if(!design) { return res.send(404); }
    var updated = _.merge(design, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, design);
    });
  });
};

// Deletes a design from the DB.
exports.destroy = function(req, res) {
  Design.findById(req.params.id, function (err, design) {
    if(err) { return handleError(res, err); }
    if(!design) { return res.send(404); }
    design.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}