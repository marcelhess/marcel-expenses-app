import mongoose from "mongoose"; //Import mongoose library to interact with MongoDB
import bcrypt from "bcryptjs"; //Import bcryptjs library to hash passwords

//define the schema, which acts as a blueprint for the User documents in MongoDB
const userSchema = new mongoose.Schema(
   //define the structure and fields within the schema
   {
      //define the "name" field
      name: {
         type: String,
         required: [true, "Name is required"], //custom error message
         trim: true,
      },
      //define the "email" field
      email: {
         type: String,
         required: [true, "Email is required"], //custom error message
         trim: true,
         lowercase: true,
      },
      //define the "password" field
      password: {
         type: String,
         required: [true, "Password is required"], //custom error message
         minLength: [8, "Password must be at least 8 characters long"], //enforce minimum length; custom error message
      },
      //define the "role" field
      role: {
         type: String,
         enum: ["admin", "sales_rep"],
         default: "sales_rep",
      },
   },
   //schema options
   {
      timestamps: true, //createdAt and updatedAt will be automatically added by MongoDB
   }
);

//define Mongoose middleware functions that run at specific points in the document lifecycle
//Pre - "pre-save" hook before documents are saved to the database (e.g. hashing passwords)
userSchema.pre("save", async function (next) {
   //the "next" function passes control to the next middleware of the save operation
   //check if the password field has been modified (or is new)
   if (!this.isModified("password")) return next(); //if not modified, skip hashing and proceed
   //hash the plain text password using bcrypt with a salt round factor of 10
   this.password = await bcrypt.hash(this.password, 10);
   //call "next()" to proceed with the save operation after hashing
   next();
});
//Post - "post-save" hook could be added here after documents are saved to the database (e.g. sending welcome email to user)

//Compile the defined schema into a Mongoose model named "User"
//Mongoose will typically create a MongoDB collection named "users" (plural and lowercase) based on the model name "User"
const User = mongoose.model("User", userSchema);

//Export the "User" so it can be imported and used in other parts of the application
export default User;
