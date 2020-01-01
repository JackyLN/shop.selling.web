var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  //productId: Schema.Types.ObjectId,
  name: String,
  updated: { type: Date, default: Date.now() },
  description: String
});

module.exports = mongoose.model('Product', ProductSchema );