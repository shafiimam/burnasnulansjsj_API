import pkg from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoose = pkg;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongodb connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;
