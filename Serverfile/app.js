import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import web from "./routes/userRoutes.js";
import upload from "./middleware/image-upload.js";
// import userRoutes from './routes/userRoutes.js'
// import multer from "multer";
// import upload from "./middleware/image-upload.js";
const app = express();

// database URL
const DATABASE_URL = process.env.DATABASE_URL;
const port = process.env.port;

// database connection
connectDB(DATABASE_URL);

// middleware
app.use(express.static("public"));
// resolve error when frontend is connected

app.use(cors());

app.use(express.json());
// app.use(express.json({ limit: "10mb", extended: true }));

// load routes
app.use("/api/user", web);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
