import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import postRouter from "./routes/post.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(express.static("src/static"));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8080;
const MongoDB_URL = process.env.MONGODB_URL!;

// Connection with DB
(async () => {
  try {
    await mongoose.connect(MongoDB_URL).then(() => console.log("Connected DB"));
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
