const { HttpError, sendEmail, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) throw HttpError(401, "Email not found");

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
        <p>Click 
            <a 
            target="_blank" 
            href="${BASE_URL}/api/users/verify/${user.verificationToken}" 
            >here
            </a> 
            to verify your email
        </p>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
