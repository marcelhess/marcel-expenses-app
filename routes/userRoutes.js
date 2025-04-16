import express from "express"; //import express framework
import { registerUser } from "../controllers/userController.js"; //import the registerUser controller function

//Route instance
const userRoutes = express.Router(); //create a new router instance for user-related routes

userRoutes.post("/register", registerUser); //define a POST route for user registration, using the registerUser controller

export default userRoutes; //export the userRoutes module for use in other parts of the application
