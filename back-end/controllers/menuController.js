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

export { getMenu, createCategory };
