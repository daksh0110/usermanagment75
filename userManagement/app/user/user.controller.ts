
import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import jwt from "jsonwebtoken";
import { User } from "./user.schema";
import { encryption } from "../common/services/hashing.bycrypt";

interface DecodedToken {
    email: string;
  }


export const resetPassword=asyncHandler(async(req:Request,res:Response)=>{
    const token =req.params.token as string

    console.log("token========="+token)
    if (!token) {
        res.status(400).json({ message: "Token is required" });
        return;
      }

const jwtSecretKey = process.env.JWT_SECRET;
if (!jwtSecretKey) {
  throw new Error("JWT secret key is not defined in the environment");
}


const decoded = jwt.verify(token, jwtSecretKey) as DecodedToken;

if (!decoded || !decoded.email) {
  res.status(401).json({ message: "Invalid or expired token" });
  return;
}


const user = await User.findOne({ email: decoded.email });
if (!user) {
  res.status(404).json({ message: "User not found" });
  return;
}


res.status(200).json({
  message: "Token is valid. Proceed to reset your password.",
  email: user.email,
});
} 
)
export const setPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
  console.log("password is: "+password)
    if (!token || !password) {
      res.status(400).json({ success: false, message: "Token and password are required" });
      return;
    }
  
    const jwtSecretKey = process.env.JWT_SECRET;
    if (!jwtSecretKey) {
      throw new Error("JWT secret key is not defined in the environment");
    }
  
    try {
      
      const decoded = jwt.verify(token, jwtSecretKey) as { email: string };
  
     
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
  
    
      const hashedPassword = await encryption(password)
  
      
      user.password = hashedPassword;
      user.token = null as unknown as string | undefined;
      await user.save();
  
    
      res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
  });
