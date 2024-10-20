import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

const verifyJWT = asyncHandler(async(req,_,next)=>{ //agr responce ka use nahi ho raha hai to usko Underscore se replace bhi kar sakte hai
   try {
     const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
 
     if(!token){
         throw new ApiError(401,"Unautherized request")
     }
 
     const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user=await User.findById(decodeToken?._id).select("-password  -refreshToken")
 
     if(!user){
         //todo :disscusion
         throw new ApiError(401,"invalid Access Tocken")
     }
     req.user=user;
     next()
   } catch (error) {
     
      throw new ApiError(401,error.message|| "invalid access tocken")
    
   }
})

export {verifyJWT}