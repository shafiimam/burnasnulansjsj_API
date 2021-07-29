import asyncHandler from "express-async-handler";
import Category from "../models/categoriesModel.js";

//@desc fetch all menu items
//@route post api/v1/categories
//@access public

const getMenu = asyncHandler(async (req, res) => {
  const menu = await Category.find({});
  res.json(menu);
});

//@desc create a menu item
//@route post api/v1/categories
//@access private/admin

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    title: req.body.title,
    menu: {
      title: req.body.menu.title,
      type: req.body.menu.type,
      day: req.body.menu.day,
      image: req.body.menu.image,
      price: req.body.menu.price,
      description: req.body.menu.description,
    },
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

//@desc update a category
//@route api/v1/category/:id
//@access protected,admin
const updateCategory = asyncHandler(async (req, res) => {
  const { title, menu } = req.body;
  const category = await Category.findById(req.params.id);
  if (category) {
    category.title = title;
    category.menu = {
      title: menu.title,
      type: menu.type,
      day: menu.day,
      image: menu.image,
      price: menu.price,
      description: menu.description,
    };
    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

//@desc delete a category
//@route api/v1/categories/:id
//@access protected,admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: "Category deleted successfully" });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});
export { getMenu, createCategory, updateCategory, deleteCategory };
