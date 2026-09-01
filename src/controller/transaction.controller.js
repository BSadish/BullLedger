import { Transaction } from "../model/transaction.model.js";
import { Ledger } from "../model/ledger.model.js";
import { sendTransaction,sendTransactionFailureEmail } from "../service/email.service.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { Account } from "../model/account.model.js";
import { ApiResponse } from "../util/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../model/user.model.js";
/**
 * - Create new Transaction
 */
const createTransaction=asyncHandler(async(req,res)=>{
    const {fromAccount,toAccount,amount,idempotencyKey}=req.body
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        throw new ApiError(400,"FromAccount, toAccount,Amount, and idempotencyKey required")
    }

    const fromUserAccount=await Account.findOne({_id:fromAccount})
    const toUserAccount=await Account.findOne({_id:toAccount})


    if(!fromUserAccount || !toUserAccount){
        throw new ApiError(400,"Invalid fromAccount or toAccount")
    }
    /**
     *  2. Validate idempotency Key
     */

    const isTransactionAlreadyExists=await Transaction.findOne({idempotencyKey})
    if(isTransactionAlreadyExists){
        if(isTransactionAlreadyExists.status==="COMPLETED"){
            return res.status(200).json(new ApiResponse(200,"Transaction already processed",{transaction:isTransactionAlreadyExists}))
        }
        if(isTransactionAlreadyExists.status==="PENDING"){
            return res.status(200)
            .json(new ApiResponse(200,"Transaction is still processing"))
        }
        if(isTransactionAlreadyExists.status==="FAILED"){
            throw new ApiError(500,"Transaction processing failed, please retry")
        }
        if(isTransactionAlreadyExists.status==="REVERSED"){
            throw new ApiError(500,"Transaction processing was REVERSED")
        }
    }

    /**
     *  3. Check account status
     */
    if(fromUserAccount.status !=="ACTIVE" || toUserAccount !=="ACTIVE"){
        throw new ApiError(400,"Both fromAccount and toAccount must be ACTIVE to process Transaction")
    }


    /**
     * 4. Checking the sender balance
     */
    const senderBalance=await fromUserAccount.getBalance()
    if(senderBalance<amount){
throw new ApiError(400,`Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`)
    }

    /**
     *  - Creating Transaction
     */

const session=await mongoose.startSession()
session.startTransaction()


const transaction=await Transaction.create({
    fromAccount,
    toAccount,
    idempotencyKey,
    status:"PENDING"
},{session})

const debitLedgerEntry=await Ledger.create({
    account:toAccount,
    amount:amount,
    transaction:transaction_id,
    type:"CREDIT"

},{session})
const creditLedgerEntry=await Ledger.create({
    account:toAccount,
    amount:amount,
    transaction:transaction_id,
    type:"CREDIT"

},{session})

transaction.status="COMPLETED"
await transaction.save({session})

await session.commitTransaction()
session.endSession()

/**
 * 10. Sending email notification to user
 */

await sendTransaction(req.user.email, req.user.name,amount, toAccount )

return res.status(201)
.json(new ApiResponse(201,"Transaction completed successfully",{transaction:transaction}))
})


const createInitialFundsTransaction=asyncHandler(async(req,res)=>{
   
    const {toAccount, amount, idempotencyKey}=req.body
     if(!amount || !toAccount ||  !idempotencyKey){
        throw new ApiError(400," toAccount,amount, and idempotencyKey required")
    }

     const toUserAccount=await Account.findOne({_id:toAccount})

    if(!toUserAccount){
        throw new ApiError(400,"Invalid toUserAccount")
    }
  

    const fromUserAccount=await Account.findOne({user:req.user._id})
    
    if(!fromUserAccount){
        throw new ApiError(400,"invalide fromUserAccount")
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new Transaction({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })

    const debitLedgerEntry = await Ledger.create([ {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    } ], { session })

    const creditLedgerEntry = await Ledger.create([ {
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    } ], { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201)
    .json(new ApiResponse(201,"Initial funds transaction completed successfully",{transaction:transaction}))
})
export {createTransaction,createInitialFundsTransaction}