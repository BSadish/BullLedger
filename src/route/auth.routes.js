import { Router } from "express";
import { userLogin, userRegister } from "../controller/auth.controller.js";

const router=Router()

/* POST /api/auth/register */
router.post("/register",userRegister)
router.post("/login",userLogin)


export default router