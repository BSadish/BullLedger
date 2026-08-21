import mongoose from "mongoose";

const accountSchema=new mongoose.Schema(
    
    
    (
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
                required:[true,"Account must be associated with a user"],
                index:true
            },

            status:{
                type:String,
                enum:["Active","Frozen","Closed"],
                default:'Active'
            },
            currency:{
                type:String,
                required:[true,"Currency is required for creating an account"],
                default:"NPR"
            }

        }
    )
    
    ,{timestamps:true})

    accountSchema.index({user:1,status:1})

    export const Account=mongoose.model("Account",accountSchema)