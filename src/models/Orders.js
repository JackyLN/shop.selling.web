var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  //productId: Schema.Types.ObjectId,
  products: [
    {type : mongoose.Schema.ObjectId, ref : 'Product'}
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
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

module.exports = mongoose.model('Order', OrderSchema);