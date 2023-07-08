const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadAvatar = async ({ filePath, fileName }) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "phonebook-avatars",
    public_id: fileName,
    width: 250,
    height: 250,
    crop: "fill",
  });

  return result;
};

const cloudinaryAPI = {
  uploadAvatar,
};

module.exports = cloudinaryAPI;
