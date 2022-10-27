const fs = require("fs").promises;
const { normalize, resolve } = require("path");

const safeJoin = (base, target) => {
  const targetPath = "." + normalize("/" + target);
  return resolve(base, targetPath);
};

const contactsPath = safeJoin(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return list;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (id) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    const contactWanted = list.find((c) => Number(c.id) === Number(id));

    return contactWanted;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const list = await listContacts();

    const removedContact = list.filter((c) => Number(c.id) === Number(id));

    const contactsListWithoutDeleteContact = JSON.stringify(
      list.filter((c) => Number(c.id) !== Number(id)),
      null,
      2
    );

    await fs.writeFile(contactsPath, contactsListWithoutDeleteContact);

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const list = await listContacts();
    const lastId = list.reduce((a, b) => {
      const prevId = Number(a.id);
      const nextId = Number(b.id);
      return prevId > nextId ? prevId : nextId;
    }, 1);

    const newContact = {
      id: String(lastId + 1),
      name,
      email,
      phone: String(phone),
    };

    const newList = JSON.stringify([...list, newContact], null, 2);

    await fs.writeFile(contactsPath, newList);

    return await listContacts();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
