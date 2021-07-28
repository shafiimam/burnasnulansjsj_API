import pkg from "mongoose";
const mongoose = pkg;

const menuSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  menu: [menuSchema],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
