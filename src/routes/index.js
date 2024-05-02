import { Router } from "express";
import userRoute from './user.route.js'

const router=Router()

const path='/api-v1/'

router.use(`${path}user`,userRoute)

export default router