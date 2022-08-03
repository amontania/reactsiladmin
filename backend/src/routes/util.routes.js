import { Router } from "express";
import { utilController } from "./../controllers/util.controller.js";
const router = Router();

router.post("/", utilController.getCombo);
console.log("ingreso aca");
export default router;
