import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getuser", verifyJWT,getUser)

export default router