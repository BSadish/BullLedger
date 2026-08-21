import { Account } from "../model/account.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";

const createAccount=asyncHandler(async(req,res)=>{


    const user=req.user
    const userExist=await Account.findOne({user:user._id})
    if(userExist){
        throw new ApiError(409,"User alredy exist")
    }
    const account=await Account.create({
        user:user._id
    })

    return res.status(201)
    .json(new ApiResponse(201,"User Account Created",{account}))
})



export {createAccount}