'use strict';

var mongoose    = require('mongoose'),
    mongooseFS = require('mongoose-fs');

var ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  created: { type: Date, default: Date.now },
  info: String,
  active: Boolean
});

ImageSchema.plugin(
  mongooseFS,
  {keys: ['content', 'complement'], mongoose: mongoose}
);

module.exports = mongoose.model('Image', ImageSchema);
