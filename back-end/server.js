import express from "express";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/menuRoutes.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/v1/categories", menuRoutes);
app.use("api/v1/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT || 5000,
  console.log(
    `server running ${process.env.NODE_ENV} mode on ${process.env.PORT}`.yellow
      .bold
  )
);
