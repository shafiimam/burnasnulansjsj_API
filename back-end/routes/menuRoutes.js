import express from "express";
import {
  createCategory,
  getMenu,
  updateCategory,
  deleteCategory,
} from "../controllers/menuController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getMenu).post(protect, admin, createCategory);
router
  .route("/:id")
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);
router.post("/", getMenu);
export default router;
