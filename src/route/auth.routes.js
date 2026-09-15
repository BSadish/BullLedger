import { Router } from "express";
import { userLogin, userLogOut, userRegister } from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()

/* POST /api/auth/register */
router.post("/register",userRegister)
router.post("/login",userLogin)

/**
 * - POST /api/auth/logout
 */
router.post("/logout",verifyJWT,userLogOut)

export default router