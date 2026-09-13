import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createAccount, getAccountBalance, getUserAccount } from "../controller/account.controler.js";

const router=Router()

/**
 * - Post /api/accounts
 * - Create a new account
 * - Protected Route
 */
router.post('/',verifyJWT,createAccount)


/**
 *  - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get('/',verifyJWT,getUserAccount)

/**
 * - GET /api/accounts/balance/:accountId
 * - 
 */
router.get("/balance/:accountId",verifyJWT,getAccountBalance)

export default router