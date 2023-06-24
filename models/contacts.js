const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const updateContactList = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const singleContact = contacts.find(({ id }) => id === contactId);
  return singleContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex(({ id }) => id === contactId);

  if (indexToRemove === -1) return null;

  const [removedContact] = contacts.splice(indexToRemove, 1);
  await updateContactList(contacts);

  return removedContact;
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContactList(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexToUpdate = contacts.findIndex(({ id }) => id === contactId);

  if (indexToUpdate === -1) return null;

  contacts[indexToUpdate] = {
    id: contactId,
    ...body,
  };

  updateContactList(contacts);
  return contacts[indexToUpdate];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
