import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my workout backend" });
});
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);

async function connectDBAndListen() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB & listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDBAndListen();
