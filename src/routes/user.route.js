import { Router } from "express";
import { getUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getuser", verifyJWT,getUser)
router.put("/updateuser",verifyJWT,updateUser)

export default router