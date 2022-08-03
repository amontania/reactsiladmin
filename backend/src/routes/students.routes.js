import { Router } from "express";
import { studentController } from "./../controllers/students.controller.js";
import auth from "./../_middleware/auth.js";
const router = Router();

router.get("/", auth, studentController.getStudents);

router.get("/:id", auth, studentController.getStudent);

router.post("/", auth, studentController.addStudent);

export default router;
