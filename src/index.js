import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from './db/index.js'
import router from './routes/index.js'
import bodyParser from 'body-parser'

const app=express()


dotenv.config({
    path:'./.env'
})

connectDB()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))




//4 major configurations 

app.use(bodyParser.json());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use(router)


app.listen(process.env.PORT,()=>{
    console.log("server created")
})