
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=mongoose.Schema((
    {
email:{
    type:String,
    required:[true, "Email is required for creating a user"],
    trim:true,
    lowercase:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique:[true, "Email already Exist"]
},
username:{
    type:String,
    required:[true,"Name is required fro crating the accound"]
},
password:{
    type:String,
    required:[true,"Password is requied for creating an account"],
    minlength:[6,"Password should be more than 6 character"],
    select:false // it exclude the password to be selected when extracting user queries or user data
}


    }

),{timestamps:true})


userSchema.pre("save",async function(){
    if(!this.isModified('password')) return 
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.isPasswordCorrect=async function(password){
return await bcrypt.compare(password,this.password)
};



export const User=mongoose.model('User',userSchema)