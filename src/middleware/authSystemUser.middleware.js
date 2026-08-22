import { User } from "../model/user.model"
import { ApiError } from "../util/ApiError"
import jwt from "jsonwebtoken"

export const authSystemUserMiddleware=async(req,res,next)=>{
    const token=req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

    if(!token){
        throw new ApiError(401,"Unauthorized access, token missing")
    }

    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decoded._id).select("+systemUser")
        if(!user.systemUser){
            throw new ApiError(403,"Frobidden access, not a system user")
        }

        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,{message:error.message})
    }
}