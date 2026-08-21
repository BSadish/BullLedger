
import { User } from "../model/user.model.js"
import { ApiError } from "../util/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../util/token.js";

export const registerUser=async({email,password,username})=>{

const isExists=await User.findOne({email})

if(isExists){
    throw new ApiError(409,"User Alredy existed")
}

const user=await User.create({
    email,password,username
})
const createdUser=await User.findById(user._id)
return createdUser;
}




export const loginUser=async(email,password)=>{

const user=await User.findOne({email}).select("+password");
if(!user){
    throw new ApiError(401,"Invalid email or password")
}

const isPasswordValide=await user.isPasswordCorrect(password)

if(!isPasswordValide){
    throw new ApiError(401,"User is invalid")
}

const accessToken=generateAccessToken(user)
const refreshToken=  generateRefreshToken(user)

return {user,accessToken,refreshToken}
}





