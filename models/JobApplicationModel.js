import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the Job model
  },

  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("JobApplication", JobApplicationSchema);
