const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id} = req.user;

  const { name, email, subscription } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({
    _id,
    name,
    email,
    subscription,
  });
};

module.exports = ctrlWrapper(updateSubscription);
