import { Router } from "express";
import add_student from "./addStudents.js"
// import login from "./login.js"


const router = Router();

router.use("/add_student", add_student);
// router.use("/login", login);






export default router;
