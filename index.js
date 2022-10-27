const { Command } = require("commander");
require("colors");

const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((list) => {
          console.log("\n", " Table with contact list: ".bgGreen, "\n");
          console.table(list);
        })
        .catch((e) => console.error(e));
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          console.log("\n", ` Contact with id ${id} `.bgMagenta, "\n");
          console.table(contact);
        })
        .catch((e) => console.error(e));
      break;

    case "add":
      addContact(name, email, phone)
        .then((list) => {
          console.log(
            "\n",
            ` List of contacts with new contact `.bgYellow,
            "\n"
          );
          console.table(list);
        })
        .catch((e) => console.error(e));
      break;

    case "remove":
          removeContact(id).then((contact) => {
              console.log("\n", ` Removed contact `.bgRed, "\n");
              console.table(contact)
          });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
