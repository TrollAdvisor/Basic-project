const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const discountSchema = new Schema({
  expiration: Date,
  type: {type: Number, enum: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]},
  pax: {type: Number, default: 2},
  message: String,
  restaurant: String,
  client: {type: String, required: true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Discount = mongoose.model('Discount', userSchema);
module.exports = Discount;