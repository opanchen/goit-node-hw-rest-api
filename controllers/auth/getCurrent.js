const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, subscription, avatarURL } = req.user;

  res.json({
    name,
    email,
    subscription,
    avatarURL,
  });
};

module.exports = ctrlWrapper(getCurrent);
