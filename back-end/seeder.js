import colors from "colors";
import users from "./Data/users.js";
import menu from "./Data/menu.js";
import User from "./models/userModel.js";
import Category from "./models/categoriesModel.js";
import connectDB from "./config/db.js";
import pkg from "mongoose";
const { mongoose } = pkg;
connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    await Category.insertMany(menu);
    console.log("data imported".green.inversed);
  } catch (error) {
    console.log(`error: ${error}`.red.underline);
    process.exit(1);
  }
};

importData();
