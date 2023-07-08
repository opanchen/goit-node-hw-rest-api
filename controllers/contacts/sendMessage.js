const { ctrlWrapper, HttpError, getCurrentDate } = require("../../helpers");
const { Contact } = require("../../models");
const { emailSendler } = require("../../services");

const sendMessage = async (req, res) => {
  const { contactId } = req.params;
  const { message } = req.body;
  const user = req.user;

  const contact = await Contact.findById(contactId);
  const isOwnContact = user._id.equals(contact.owner); // the way to compare ObjectId

  if (!isOwnContact) throw HttpError(404, "Contact not found");

  const emailToSend = {
    to: contact.email,
    subject: `Message via Phonebook App`,
    html: `
    <p>You have new message from <b>${user.email}</b>:</p>
    <br>
    <p><em>"${message}"</em></p>
    <br>
    <p>This email was generated automatically. Please don't reply back to it! \nYou can communicate with the sender via ${user.email}. </p>
    <p>Thank you for attention.</p>
    `,
  };

  await emailSendler.sendEmail(emailToSend);

  const date = getCurrentDate();
  const sentMessages = [...contact.sentMessages, { message, date }];
  await Contact.findByIdAndUpdate(contactId, { sentMessages });

  res.json({
    message: "New email sent",
  });
};

module.exports = ctrlWrapper(sendMessage);
