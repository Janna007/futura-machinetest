// 1.craete product---user IdleDeadline
// 2.update
// 3.view
// 4.delete

import { Product } from "../models/product.model.js";

const createProduct=async( req,res,next)=>{
    const { name, description, price, quantity } = req.body;
    try {
        if(!name || !price ||!quantity || !description){
            throw new Error("All fields are required")
            
        }

        const product=await Product.create({
            name, description, price, quantity ,owner:req?.user?._id
        })

        if(!product){
            throw new Error("Something went wrong")
            
        }

        return res.status(200).send({
            success:true,
            message:"Product create succesfully",
            product
        })

        

        
    } catch (error) {
        console.log(error)
        return res.status(400).send(error?.message)
    }
}

const updateProduct=async(req,res,next)=>{
try {
    const { name, description, price, quantity } = req.body;

    if(!name || !price ||!quantity || !description){
        throw new Error("All fields are required")}

        
        console.log(req.params.id)

        const product=await Product.findById(req.params.id)

        if(!product){
            throw new Error("No product found with this id")
        }

        if(req?.user?._id.toString()!== product?.owner.toString()){
            throw new Error("You are not allowed to update")
        }
        const updateProduct=await Product.findByIdAndUpdate(product?._id,{
            $set:{
                name, description, price, quantity
            }
        },{new:true})

        if(!updateProduct){
            throw new Error("Something went wrong")
        }

        return res.status(200).send({
            success:true,
            message:"Product update succesfully",
            updateProduct
        })




} catch (error) {
    console.log(error)
    return res.status(400).send(error?.message)
}
}

const getProduct=async(req,res,next)=>{
   try {
    const product=await Product.findById(req.params.id)
     if(!product){
        throw new Error("invalid request")
     }
   
     return res.status(200).send({
        success:true,
        message:"Product get succesfully",
        product
    })

   } catch (error) {
    console.log(error)
    return res.status(400).send(error?.message)
   }
}


const deleteProduct=async(req,res,next)=>{
   try {
     const product=await Product.findById(req.params.id)
      if(!product){
         throw new Error("invalid request")
      }
      if(req?.user?._id.toString()!== product?.owner.toString()){
        throw new Error("You are not allowed to update")
    }
      await Product.findByIdAndDelete(product?._id)
      return res.status(200).send({
         success:true,
         message:"Product deleted succesfully",
         product
        
     })
 }
    catch (error) {
    console.log(error)
    return res.status(400).send(error?.message)
   }
}

export {createProduct,updateProduct,getProduct,deleteProduct}