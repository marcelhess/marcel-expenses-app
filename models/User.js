import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Schema = Blueprint
const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Name is required"],
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: [true, "Password is required"],
         minLength: [8, "Password must be at least 8 characters long"],
      },
      role: {
         type: String,
         enum: ["admin", "sales_rep"],
         default: "sales_rep",
      },
   },
   {
      timestamps: true, //crreatedAt and updatedAt will be automatically added by MongoDB
   }
);

//Middlewares in Mongoose
//Pre - before documents are saved to the database (e.g. hashing passwords)
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});
//Post - after documents are saved to the database (e.g. sending email to user)

//Compile the schema to form a model
const User = mongoose.model("User", userSchema);

//Export the model to make it accessible in any part of the project
export default User;
