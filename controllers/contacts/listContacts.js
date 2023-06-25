const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);
