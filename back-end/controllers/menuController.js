import asyncHandler from "express-async-handler";
import Category from "../models/categoriesModel.js";

//@desc fetch all menu items
//@route post api/v1/categories
//@access public

const getMenu = asyncHandler(async (req, res) => {
  const menu = await Category.fin({});
  res.json(menu);
});

//@desc create a menu item
//@route post api/v1/categories
//@access private/admin

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    title: "sample title",
    menu: {
      title: "sample title",
      type: "sample type",
      day: "Monday",
      image: "Images/sample.jpg",
      price: 10,
      description: "Sample description",
    },
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

export { getMenu, createCategory };
