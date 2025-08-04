const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true,
    trim:     true,
  },
  email: {
    type:     String,
    required: true,
    unique:   true,
    lowercase: true,
  },
  passwordHash: {
    type:     String,
    required: true,
  },
}, { timestamps: true });

// Instance method to compare password
userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
