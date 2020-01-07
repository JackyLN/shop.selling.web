var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  //productId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: String,
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  imageurl: String,
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  selling: Boolean,
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Product', ProductSchema);