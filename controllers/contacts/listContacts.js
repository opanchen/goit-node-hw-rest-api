const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = [true, false] } = req.query;
  const skip = (page - 1) * limit;

  console.log("REQUEST.USER: ", req.user);
  console.log("REQUEST.QUERY: ", req.query);

  const result = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.json(result);
};

module.exports = ctrlWrapper(listContacts);
