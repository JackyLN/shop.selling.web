var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  //productId: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    //temporary store as plain text for demo purpose
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
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

module.exports = mongoose.model('Customer', CustomerSchema);