import mongoose, { model } from "mongoose";

const tokenBlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required to blacklist"],
        unique:[true,"Token is alredy blacklist"]
    }
   
},{timestmps:true})

tokenBlacklistSchema.index({createdAt:1},{
    expireAfterSeconds:60*60*42*3
})

export const Blacklist=mongoose.model("Blacklist",tokenBlacklistSchema)
