import { User } from "../model/user.model.js";
import { registerUser } from "../service/auth.service.js";
import { loginUser } from "../service/auth.service.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";



/**
 * - user register controller
 * - POST /api/auth/register
 */
const userRegister=asyncHandler(async(req,res)=>{

const {email,password,username}=req.body

const user=await registerUser({email,password,username})

return res.status(201)
.json(new ApiResponse(201,"User registered Successfully",{user}))

})

const Options={
    httpOnly:true,
    sameSite:"strict",
    secure:true
};

const userLogin=asyncHandler(async(req,res)=>{
    const {email,password,username}=req.body

const {user,accessToken,refreshToken}= await loginUser(email,password)


return res
.status(200)
.cookie("accessToken",accessToken,Options)
.cookie("refreshToken",refreshToken,Options)
.json(new ApiResponse(200,{user
    
}, "User logged in Successfully"))

})



export {userRegister,userLogin}