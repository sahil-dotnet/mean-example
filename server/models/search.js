var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var searchSchema = new Schema({
  query : { type: String },
  images: { type: Array },
  date_created : { type: Date, default: Date.now }
});

var Search = mongoose.model('Search', searchSchema);
module.exports = mongoose.model('Search', searchSchema);
