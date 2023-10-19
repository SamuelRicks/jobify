//PACKAGE IMPORT

import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// ROUTE IMPORT
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// PUBLIC
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// CUSTOME MIDDLEWARE IMPORT
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authenticationMiddeware.js";

const app = express();
const port = process.env.PORT || 5100;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOOD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

// GET REQUEST
app.get("/", (req, res) => {
  res.send("Hello World");
});

//JOB ROUTES
app.use("/api/v1/jobs", authenticateUser, jobRouter);

//AUTH ROUTES
app.use("/api/v1/auth", authRouter);

//USER ROUTES
app.use("/api/v1/user", authenticateUser, userRouter);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// NOT FOUND ERROR
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

// SERVER ERROR
app.use(errorHandlerMiddleware);

// DATABASE CONNECTION WITH MONGOOSE
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port: ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
