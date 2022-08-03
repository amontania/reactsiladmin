import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", authController.getUser);

router.post("/register", authController.addUser);

export default router;
