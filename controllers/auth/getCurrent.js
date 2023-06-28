const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, subscription } = req.user;
  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = ctrlWrapper(getCurrent);
