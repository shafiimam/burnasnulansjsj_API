import bcrypt from "bcryptjs";
import randString from "../utils/randString.js";
const users = [
  {
    name: "shafi imam",
    email: "shafi@example.com",
    phone: "01779584929",
    password: bcrypt.hashSync("123456", 10),
    uniqueString: randString(),
    isAdmin: true,
    isVerified: false,
  },
  {
    name: "mafi imam",
    email: "mafi@example.com",
    phone: "01686176753",
    password: bcrypt.hashSync("123456", 10),
    uniqueString: randString(),
    isAdmin: false,
    isVerified: false,
  },
];

export default users;
