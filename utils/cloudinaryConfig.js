const cloudinary = require('cloudinary').v2;
require("dotenv").config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_CLOUD_API_KEY,
  api_secret: process.env.YOUR_CLOUD_API_SECRET,
});

module.exports = cloudinary;
