import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "../models/JobModel.js";
import Employer from "../models/EmployerModel.js";
try {
  await mongoose.connect(
    "mongodb+srv://huzaifaalix:asd123@cluster0.zzgtiqq.mongodb.net/jobPortal"
  );
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const employer = await Employer.findOne({ email: "ahmed@gmail.com" });

  const jsonJobs = JSON.parse(
    await readFile(new URL("./mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: employer._id };
  });
  await Job.deleteMany({ createdBy: employer._id });
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
