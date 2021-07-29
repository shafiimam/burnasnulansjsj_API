import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/v1/categories", menuRoutes);
app.use("/api/v1/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT || 5000,
  console.log(
    `server running ${process.env.NODE_ENV} mode on ${process.env.PORT}`
  )
);
