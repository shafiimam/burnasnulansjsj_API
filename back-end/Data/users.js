import bcrypt from "bcryptjs";

const users = [
  {
    name: "shafi imam",
    email: "shafi@example.com",
    phone: "01779584929",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "mafi imam",
    email: "mafi@example.com",
    phone: "01686176753",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
