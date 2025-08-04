// config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI /*, no need for useUnifiedTopology */);
  console.log('✅ MongoDB connected');
}

module.exports = connectDB;
