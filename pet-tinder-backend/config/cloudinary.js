// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_URL) {
  console.error('CLOUDINARY_URL not found in .env');
  process.exit(1);
}

cloudinary.config({
  secure: true, // always use HTTPS
});

module.exports = cloudinary;
