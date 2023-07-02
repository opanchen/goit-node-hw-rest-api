const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email is already in use.");

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
    <p>Click 
        <a 
        target="_blank" 
        href="${BASE_URL}/api/users/verify/${verificationToken}" 
        >here
        </a> 
        to verify your email
    </p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = ctrlWrapper(register);
