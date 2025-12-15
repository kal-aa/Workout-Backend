import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, required: true },
    load: {
      type: Number,
      required: true,
      min: [0, "Load cannot be less than 0"],
    },
    reps: {
      type: Number,
      required: true,
      min: [1, "Reps must be at least 1"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
