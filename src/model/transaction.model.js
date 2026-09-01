import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        fromAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            required: [true, "Transaction must be associated with the from account"],
            index: true
        },
        toAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            required: [true, "Transaction must be associated with the to account"],
            index: true
        },
        status: {
            type: String,
            enum: {
                values: ['PENDING', 'COMPLETED', 'FAILED', 'REVERSED'],
                message: "Status can be either Pending, Completed, Failed or Reversed"
            },
            default: "PENDING"
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Transaction amount cannot be negative"]
        },
        idempotencyKey: {
            type: String,
            required: [true, "Idempotency key requied for creating a transaction"],
            index: true
        }

    }
    , { timestamps: true })



export const Transaction = mongoose.model("Transaction", transactionSchema)