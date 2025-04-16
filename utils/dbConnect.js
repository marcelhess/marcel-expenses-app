import mongoose from "mongoose";

/**
 * Connect to MongoDB database using Mongoose.
 * @returns {Promise} - A promise that resolves when the connection is successful.
 */

const dbConnect = () => {
   return mongoose.connect(process.env.DB_URL);
};

export default dbConnect;
