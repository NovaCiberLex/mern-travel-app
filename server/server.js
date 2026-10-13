import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import citiesRouter from "./routes/cities.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/cities", citiesRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});