import "express-async-errors";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import JobRouter from "./routes/jobRouter.js";
import AuthRouter from "./routes/authRouter.js";
import UserRouter from "./routes/userRouter.js";
import ApplicationRouter from "./routes/applicationRouter.js";
import cloudinary from "cloudinary";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

dotenv.config();
app.use(cookieParser());

const port = process.env.PORT;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

cloudinary.config({
  cloud_name: "dix51xidu",
  api_key: "241826781534939",
  api_secret: "ouD98GFkWM3oBe4Ey1GHJawghpQ",
});
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.post("/", (req, res) => {
  res.json({ message: "Data received!", data: req.body });
});

app.use("/api/v1/jobs", authenticateUser, JobRouter);
app.use("/api/v1/users", authenticateUser, UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/applications", authenticateUser, ApplicationRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
