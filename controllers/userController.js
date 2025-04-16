import asyncHandler from "express-async-handler"; //import asyncHandler to handle async errors
import User from "../models/User.js"; //import the User model

const registerUser = asyncHandler(async (req, res) => {
   //destructure the request body to extract name, password, and email fields
   const { name, password, email } = req.body; //extract fields from the request body
   //check if user email exists in the database
   const emailFound = await User.findOne({ email });
   if (emailFound) {
      return res.status(500).json({
         status: "Error!", //indicate failure
         message: "User already exists", //add a descriptive message
      });
   }
   //create a new user instance with the provided name, password, and email
   const userCreated = await User.create({
      name,
      password,
      email,
   });
   //success response with the created user data
   res.json({
      status: "Success!", //indicate success
      message: "User registered successfully", //add a descriptive message
      data: userCreated, //include the created user data
   });
});

export { registerUser }; //export the registerUser function for use in other parts of the application
