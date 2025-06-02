import mongoose from "mongoose";

const MONGO_DB_URL =
  process.env.MONGO_DB || "mongodb://localhost:27017/elearning";
console.log(`Connecting to MongoDB at ${MONGO_DB_URL}`);

export const connectDB = async () => {
  try {
    mongoose.connect(MONGO_DB_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
};
