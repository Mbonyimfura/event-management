
const cloudinary = require('cloudinary').v2;
const path = require('path');
const dotenv = require('dotenv');
const envFilePath = path.join(__dirname, 'config.env');
dotenv.config({ path: envFilePath });
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
          
