import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

//Create express app
const app = express();
const PORT = process.env.PORT || 4000;

//Connect to MongoDB
mongoose
   .connect(
      "mongodb+srv://marcelhessch:jFu8Tt1RY5F9P1kl@marcel-expenses-app.1rwg8.mongodb.net/marcel-expenses-db?retryWrites=true&w=majority&appName=marcel-expenses-app"
   )
   .then(() => {
      console.log("MongoDB connected successfully...");
   })
   .catch((error) => {
      console.log(`Error connecting to MongoDB: ${error.message}`);
   });

//Create a new user document
User.create({
   name: "Marcel",
   email: "marcel@gmail.com",
   password: "12345678",
})
   .then((user) => {
      console.log(user);
   })
   .catch((error) => {
      console.log(error);
   });

//Start server
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
