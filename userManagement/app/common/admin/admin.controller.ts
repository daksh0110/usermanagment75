import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Admin } from "./admin.schema";
import { User } from "../../user/user.schema";
import { isValidPassword } from "../services/passport-jwt.service";
import { generateTokens } from "../services/webtoken.jwt.service";
import jwt from "jsonwebtoken";
import { EmailModule } from "../services/email.service";

// Admin login function
export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });
  if (!user) {
    res.status(401).json({ success: false, message: "Admin not registered" });
    return;
  }

  if (!(await isValidPassword(password, user.password))) {
    res.status(401).json({ success: false, message: "Incorrect password" });
    return;
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateTokens(user.name, user.email);

  // Save the refresh token to the database
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
  });
  return;
});

// Create a new user or update existing user with a temporary JWT token
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  // Generate a temporary JWT token (for password reset or email verification)
  const jwtSecretKey = process.env.JWT_SECRET;
  if (!jwtSecretKey) {
    throw new Error("JWT secret key is not defined in the environment");
  }

  // Set expiration time (e.g., 1 hour)
  const expiresIn = '1h';

  // Generate JWT token with the user's email as the payload
  const token = jwt.sign({ email }, jwtSecretKey, { expiresIn });

  // Check if the user already exists
  let user = await User.findOne({ email });

  if (user) {
    // If the user exists, update the token
    user.token = token;
    await user.save();
  } else {
    // If the user does not exist, create a new user
    user = new User({
      name,
      email,
      role: "USER",
      password: null, // Assuming the password is set later
      refreshToken: null,
      token, // Store the generated token
    });

    // Save the new user to the database
    await user.save();
  }

  // Send the email with the generated token
  await EmailModule(email, name, token);

  // Respond with success
  res.status(200).json({ success: true, message: "User created or updated successfully" });
});

export const blockUser = async (req: Request, res: Response) => {
    const { id } = req.params; // Get the user ID from the request parameters
  
    try {
   
      const user = await User.findById(id);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Block the user by setting isBlocked to true
      user.isBlocked = true;
  
      // Save the updated user document
      await user.save();
  
      // Return success message
      res.status(200).json({ message: "User has been blocked successfully" });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };


  export const getUsers = async (req: Request, res: Response) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      // Return the list of users
      res.status(200).json({ users });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };