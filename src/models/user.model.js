import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
 }

userSchema.methods.generateToken=async function(){
   return jwt.sign({
         _id:this._id,
         name:this.name,
         email:this.email,
         password:this.password
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}




export const User=mongoose.model("User",userSchema)