const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");
const { emailSendler } = require("../../services");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email not found");

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Phonebook App verification",
    html: `
        <p>Please follow 
            <a 
            target="_blank" 
            rel="noreferrer noopener"
            href="${BASE_URL}/api/users/verify/${user.verificationToken}" 
            >this link
            </a> 
            to verify your email.
        </p>`,
  };

  await emailSendler.sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
