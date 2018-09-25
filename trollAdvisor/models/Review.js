const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  Date: {type: String, required:true},
  restaurant: {type: Schema.Types.ObjectId, ref: 'User'},
  client: {type: Schema.Types.ObjectId, ref: 'User'},
  pax: {type: Number, default: 2},
  message: String,
  ratingReview: {type: Number},
  loudness: {type: Number, min:0, max:10},
  tip: {type: Number, min:0, max:10},
  hygiene: {type: Number, min:0, max:10},
  modals: {type: Number, min:0, max:10},
  bigSpender: {type: Number, min:0, max:10}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
