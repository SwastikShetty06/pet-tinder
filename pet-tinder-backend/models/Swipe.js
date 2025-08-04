const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },
  petId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Pet',
    required: true,
  },
  direction: {
    type:     String,
    enum:     ['like','pass'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Swipe', swipeSchema);
