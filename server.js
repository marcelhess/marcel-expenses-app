import express from "express"; //import the express framework for building the web server
import mongoose from "mongoose"; //import Mongoose for MongoDB interactions
import User from "./models/User.js"; //import the User model defined in User.js

//create an instance of the express application
const app = express();
//define the port the server will listen on, using environment variable PORT or defaulting to 4000
const PORT = process.env.PORT || 4000;

//---MongoDB Connection---//
//attempt to connect to the MongoDB database using the connection string
mongoose
   .connect(
      "mongodb+srv://marcelhessch:mhIkSSvo0Wt8EoWj@marcel-expenses-app.1rwg8.mongodb.net/marcel-expenses?retryWrites=true&w=majority&appName=marcel-expenses-app"
   )
   .then(() => {
      //log a success message if the connection is established
      console.log("MongoDB connected successfully...");
   })
   .catch((error) => {
      //log an error message if the connection fails
      console.log(`Error connecting to MongoDB: ${error.message}`);
   });

//Create a new user document
// User.create({
//    name: "Marcel",
//    email: "marcel@gmail.com",
//    password: "12345678", //note: password will be hashed by the pre-save hook in User.js
// })
//    .then((user) => {
//       console.log(user);
//    })
//    .catch((error) => {
//       console.log(error);
//    });

//---API Routes---//

//define a POST route for user registration at "/api/v1/register"
app.post("/api/v1/register", async (req, res) => {
   //perform database operations
   //Creating a user
   //use a try...catch block to handle potential errors during database operations -> user creation
   try {
      //---database operation: create user---
      //create a new user document in the database using the User model
      //note: values are currently hardcoded. In a real application these would come from the request body (req.body)
      const userCreated = await User.create({
         name: "Marcel", //TODO: replace with data from request body (e.g., req.body.name)
         password: "12345678", //TODO: replace with data from request body (e.g., req.body.password)
         email: "marcel@gmail.com", //TODO: replace with data from request body (e.g., req.body.email)
      });
      //---success response---
      //send a JSON response back to the client indication success
      res.json({
         status: "success", //it's good practice to include a status field
         message: "User registered successfully", //add a descriptive message
         data: userCreated, //send the created user data (exluding password) back to the client
      });
   } catch (error) {
      //---error handling---
      //if an error occurs during the try block (e.g., validation error, database error), catch it here
      //send a JSON response back to the client indicating failure
      res.status(500).json({
         //set appropriate HTTP status code (500 for server error)
         status: "error", //indicate failure
         message: "User registration failed", //add a descriptive message
         error: error.message, //send the error message back to the client (for debugging purposes)
      });
   }
});

//---Start the server---//
//make the Express application listen for incoming requests on the specified PORT
app.listen(PORT, () => {
   //log a message indicating the server is running and the port it's listening on
   console.log(`Server is running on ${PORT}`);
});
