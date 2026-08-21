import { User } from "../model/user.model.js";
import { ApiError } from "../util/ApiError.js";
import jwt from "jsonwebtoken"

const verifyJWT = async (req, res, next) => {

    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer", "")

    if (!token) {
        throw new ApiError(401, "Authentication required")
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