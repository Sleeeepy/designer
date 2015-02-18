'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DesignSchema = new Schema({
  ref: String,
  info: String,
  active: Boolean,
  created: { type: Date, default: Date.now },
  due: Date,
  designer: String,//Schema.Types.ObjectId,
  company: String,//Schema.Types.ObjectId,
  productType: String,
  description: String,
  images: [],
  status: {type: String, default: 'new'},
  specs: {
			composition: String,
			colourway: String,
			ends: Number,
			gauge: Number,
			fcount: Number,
			dimensions: { width: Number, length: Number },
	samples:[Schema.Types.ObjectId],
	spec_sheet: String,

  }
});

module.exports = mongoose.model('Design', DesignSchema);
