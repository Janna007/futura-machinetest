import { Router } from "express";
import userRoute from './user.route.js'
import productUser from './product.route.js'

const router=Router()

const path='/api-v1/'

router.use(`${path}user`,userRoute)
router.use(`${path}product`,productUser)

export default router