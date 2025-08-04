const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  ownerId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
  },
  name:    { type: String, required: true },
  species: { type: String, required: true },
  breed:   { type: String, default: '' },
  age:     { type: Number, default: 0 },
  bio:     { type: String, default: '' },
  images:  [String], // array of Cloudinary URLs
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
