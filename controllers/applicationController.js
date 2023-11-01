import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Employer from "../models/EmployerModel.js";
import Job from "../models/JobModel.js";
import JobApplication from "../models/JobApplicationModel.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.userId; // Assuming you have user authentication in place

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Job not found" });
    }

    // Ensure the user is not the job's creator (cannot apply to own job)
    if (job.createdBy.equals(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You cannot apply to your own job" });
    }

    // Check if the user has already applied to this job
    const existingApplication = await JobApplication.findOne({
      user: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You have already applied to this job" });
    }

    // Create a new job application document
    const jobApplication = new JobApplication({
      user: userId,
      job: jobId,
    });

    await jobApplication.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while applying for the job" });
  }
};

export const getApplications = async (req, res) => {
  const employerId = req.user.userId; // Assuming you have employer authentication in place

  try {
    // Get all jobs created by the employer
    const jobs = await Job.find({ createdBy: employerId });

    // Extract job IDs
    const jobIds = jobs.map((job) => job._id);

    // Query job applications for the employer's jobs
    const jobApplications = await JobApplication.find({ job: { $in: jobIds } })
      .populate("user") // Include user details
      .populate("job"); // Include job details

    res.status(StatusCodes.OK).json({ jobApplications });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching job applications" });
  }
};

//GET APPLICATIONS FOR THE USER

export const getUserApplications = async (req, res) => {
  const userId = req.user.userId;
  console.log("Received request for user ID:", userId); // Add this line for debugging
  try {
    // Query job applications by the user's ID
    const jobApplications = await JobApplication.find({
      user: userId,
    }).populate("job"); // Include job details

    res.status(StatusCodes.OK).json({ jobApplications });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching applied jobs" });
  }
};

//GET SINGLE APPLICATION

export const getApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log("Received request for application ID:", jobId); // Add this line for debugging
    const application = await JobApplication.findById(jobId).populate("job");

    if (!application) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Job application not found" });
    }

    res.status(StatusCodes.OK).json({ application });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching the job application" });
  }
};

//UPDATE APPLICATION
export const updatedJobApplication = async (req, res) => {
  const { jobId } = req.params;
  const updatedJobValues = req.body; // Assuming updated job values are sent in the request body
  console.log(updatedJobValues);
  try {
    // Find the job application and populate the 'job' field
    const jobApplication = await JobApplication.findById(jobId).populate("job");

    if (!jobApplication) {
      return res.status(404).json({ error: "Job Application not found" });
    }

    // Update each property of the "job" object individually
    if (updatedJobValues.company) {
      jobApplication.job.company = updatedJobValues.company;
    }
    if (updatedJobValues.position) {
      jobApplication.job.position = updatedJobValues.position;
    }
    if (updatedJobValues.jobStatus) {
      jobApplication.job.jobStatus = updatedJobValues.jobStatus;
    }
    if (updatedJobValues.jobType) {
      jobApplication.job.jobType = updatedJobValues.jobType;
    }
    if (updatedJobValues.jobLocation) {
      jobApplication.job.jobLocation = updatedJobValues.jobLocation;
    }

    // Save the updated job application document.
    await jobApplication.job.save();

    res.status(200).json({ updatedJobApplication: jobApplication });
    console.log("Updated job application:", jobApplication); // Add this line for debugging
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//APPLICATION STATS
export const showApplicationStats = async (req, res) => {
  let stats = await JobApplication.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $lookup: {
        from: "jobs", // Replace with the actual name of your jobs collection
        localField: "job",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $unwind: "$job", // Unwind the "job" array created by the $lookup stage
    },
    {
      $group: {
        _id: "$job.jobStatus",
        count: { $sum: 1 },
      },
    },
  ]);
  console.log("Stats:", stats); // Add this line for debugging
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
