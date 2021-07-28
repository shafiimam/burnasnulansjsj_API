import bcrypt from "bcryptjs";

const users = [
  {
    name: "shafi imam",
    email: "shafi@example.com",
    phone: "01779584929",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;
