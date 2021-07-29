import dotenv from "dotenv";
import pkg from "mongoose";
dotenv.config();
const mongoose = pkg;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongodb connected:${conn.connection.host}`);
  } catch (error) {
    console.error(`error:${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
