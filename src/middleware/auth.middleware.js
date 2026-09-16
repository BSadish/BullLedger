import { Blacklist } from "../model/blacklist.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../util/ApiError.js";
import jwt from "jsonwebtoken"

const verifyJWT = async (req, res, next) => {

    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

    if (!token) {
        throw new ApiError(401, "Authentication required")
    }

    const isBlacklisted=await Blacklist.findOne({token})


    if(isBlacklisted){
   
        return res.status(401).json({message:"Unauthorized access, token is missing"})
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(401, "User not found");
        }
        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
}

export {verifyJWT}