const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: 'matchedAt' } });

module.exports = mongoose.model('Match', matchSchema);
