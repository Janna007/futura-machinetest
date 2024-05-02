import { User } from "../models/user.model.js"


const registerUser=async(req,res,next)=>{
        const {name,email,password}=req.body 
    try {

        if([name,email,password].some((field)=>field?.trim() ==="")){
             res.status(400).send("all fields are required")
     }

        // if(!name && !email &&  !password){
        //     res.send("all fields are required")
        // }
        
       const alreadyExist=await User.findOne({email})

       if(alreadyExist){
        res.status(400).send("User already exist")
       }

       const user=await User.create({
        name,
        email,
        password
       })

       const createdUser=await User.findById(user?._id)

       if(!createdUser){
        res.status(500).send("something went wrong while creating user")
       }

       return res.status(200).send({
        success:true,
        message:"Registerd uccessfully",
        user:createdUser
       })



    } catch (error) {
        console.log(error)
        res.status(404).json({error:error.message})
    }
}


const loginUser=async (req,res,next)=>{
    const {email,password}=req.body
   try {
      if(!email || !password){
        res.status(400).send("all fields are required")
      }

      const userExist=await User.findOne({email})
      if(!userExist){
       return res.status(404).send("User with this email not exist")
      }
     
      const user=await User.findById(userExist._id)

      const isPasswordCorrect=await user.isPasswordCorrect(password)

      if(!isPasswordCorrect){
       return  res.status(400).send("incorrect password")
      }

      const token =await user.generateToken()

      return res.status(200).send({
        success:true,
        message:"Loggined succesfully",
        user,
        token
      })
           
      
      
    
   } catch (error) {
        console.log(error)
        res.status(404).json({error:error.message})
   }
}

const getUser=async (req,res,next)=>{
   try {
     const user=req.user
 
     const userExist=await User.findById(user._id)
 
     if(!userExist){
         return res.status(404).send("No user found")
     }
 
     return res.status(200)
     .send({
         success:true,
         message:"Get user succesfully",
         user
     })
   } catch (error) {
    console.log(error)
    return res.status(404)
   }
}


const updateUser=async (req,res,next)=>{
    try {
        const {name,email}=req.body

        const user=req.user

        const userExist=await User.findById(user?._id)

        if(!userExist) {
            throw new Error("invalid email and password")
           
        }

        const updateUser=await User.findByIdAndUpdate(userExist?._id,{
            $set:{
                name,email
            }
        },{new :true})

        if(!updateUser){
            next("something went wrong while updating")
            return
        }
        return res.status(200).send({
            success:true,
            message:"update user succesfully",
            user:updateUser
        })

        
    } catch (error) {
        console.log(error)
    return res.status(404).send(error?.message)
    }
}
export {registerUser,
    loginUser,
    getUser,
    updateUser
}