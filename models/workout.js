import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true, min: [0, "Load cannot be less than 1"] },
    load: { type: Number, required: true, min: [1, "Reps must be at least 1"] },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
