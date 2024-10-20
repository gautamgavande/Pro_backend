import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'


const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
 
app.use(express.json({limit:"16kb"})) //limit set kar dete hai itna hi data aana chahia
app.use(express.urlencoded({extended:true,limit:"16kb"}))  // url ke data ko encoded kar deta hai

app.use(express.static("public")) //static file ko store karne ke use hota hai apne local app me

app.use(cookieParser())//cookie ko access karne ke lia use hota hai

//routes import
import userRouter from './routes/user.routes.js'  //yaha apan tab hi manchahe name se import kar skte hai jab export default kiya ho

//routes declaration
app.use("/api/v1/user",userRouter) //v1 versioning ke lia use hota hai

export {app} 