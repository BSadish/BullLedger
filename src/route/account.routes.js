import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createAccount } from "../controller/account.controler.js";

const router=Router()

/**
 * - Post /api/accounts
 * - Create a new account
 * - Protected Route
 */
router.post('/',verifyJWT,createAccount)



export default router