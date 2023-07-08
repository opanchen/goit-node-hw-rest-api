const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { cloudinaryAPI } = require("../../services");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  //   Uploading image from temporary dir to cloud:
  const { url: avatarURL } = await cloudinaryAPI.uploadAvatar({
    fileName: `${_id}_avatar`,
    filePath: tempUpload,
  });

  //   Edit and move image from temporary dir to local one:
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  // or we can use local-dir url instead of cloud service:
  //   const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
