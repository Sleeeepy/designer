'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DesignSchema = new Schema({
  ref: String,
  info: String,
  active: Boolean,
  created: { type: Date, default: Date.now },
  designer: Schema.Types.ObjectId,
  company: Schema.Types.ObjectId,
  product_type: String,
  description: String,
  specs: {
			composition: String,
			colourway: String,
			ends: Number,
			gauge: Number,
			fcount: Number,
			dimensions: { width: Number, length: Number },
	samples:[Schema.Types.ObjectId],
	status: String,
	spec_sheet: String,
	images: []
			
  
  }
});

module.exports = mongoose.model('Design', DesignSchema);