import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/admin.middleware.js";
import { getUsers } from "../controllers/admin.controller.js";

const router=Router()

router.get("/getUsers",verifyJWT,adminAuthMiddleware,getUsers)


export default router