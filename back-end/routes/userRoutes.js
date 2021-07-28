import express from "express";
import { authUser, registerUser } from "../controllers/menuController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

export default router;
