import { Router } from "express";
import { createInitialFundsTransaction, createTransaction } from "../controller/transaction.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { authSystemUserMiddleware } from "../middleware/authSystemUser.middleware.js";
const transactionRouter=Router()

/**
 *  - POST api/transaction
 * - Create new transaction
 */

transactionRouter.post('/', verifyJWT,createTransaction)
 /**
  * - POST /api/transactions/system/initial-funds
  * - Create initial funds transaction from system user
  */

 transactionRouter.post('/system/initial-funds',authSystemUserMiddleware, createInitialFundsTransaction)
export default transactionRouter