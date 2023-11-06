const cloudinary = require("cloudinary");
require("dotenv").config();

const CLOUD_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUD_NAME = process.env.CLOUDINARY_NAME;

cloudinary.v2.config({
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  cloud_name: CLOUD_NAME,
});

const uploadToCloud = async (filepath) => {
  const { secure_url } = await cloudinary.v2.uploader.upload(filepath);
  return secure_url;
};

const deleteFromCloud = async (fileurl) => {
  await cloudinary.v2.uploader.destroy(fileurl);
};

module.exports = { uploadToCloud, deleteFromCloud };
