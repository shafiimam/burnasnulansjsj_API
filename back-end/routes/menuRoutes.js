import express from "express";
import { getMenu, createCategory } from "../controllers/menuController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getMenu).post(protect, admin, createCategory);
router.post("/", getMenu);

export default router;
