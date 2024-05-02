import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.post("/create",verifyJWT,createProduct)
router.put("/update/:id",verifyJWT,updateProduct)
router.get("/getproduct/:id",verifyJWT,getProduct)
router.delete("/delete/:id",verifyJWT,deleteProduct)

export default router