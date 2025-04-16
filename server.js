import dotenv from "dotenv"; //import dotenv to load environment variables from a .env file
dotenv.config(); //load environment variables from .env file
import express from "express"; //import the express framework for building the web server
import userRoutes from "./routes/userRoutes.js";
import dbConnect from "./utils/dbConnect.js"; //import the database connection utility
//import the user routes for handling user-related API requests

//create an instance of the express application
const app = express();
//define the port the server will listen on, using environment variable PORT or defaulting to 4000
const PORT = process.env.PORT || 4000;

//---MongoDB Connection---//

//---Middleware---//
app.use(express.json()); //use express.json() middleware to parse incoming JSON requests

//---User API Routes---//
app.use("/api/v1/users", userRoutes); //use the userRoutes for handling user-related API requests

//!Start MongoDB before starting the server
dbConnect()
   .then(() => {
      console.log("MongoDB connected successfully"); //log a message indicating successful connection to MongoDB
      //---Start the server---//
      //make the Express application listen for incoming requests on the specified PORT
      app.listen(PORT, () => {
         //log a message indicating the server is running and the port it's listening on
         console.log(`Server is running on ${PORT}`);
      });
   })
   .catch((error) => {
      //log an error message if the MongoDB connection fails
      console.log(`Error connecting to MongoDB: ${error.message}`);
      //exit the process with a failure code
      process.exit(1); //exit the process with a failure code
   });
