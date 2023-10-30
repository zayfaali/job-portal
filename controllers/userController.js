import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Employer from "../models/EmployerModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "User not authenticated" });
    }

    let userDetails;

    if (req.user.role === "user" || req.user.role === "admin") {
      // If the logged-in user is a regular user or admin
      userDetails = await User.findOne({ _id: req.user.userId });
    } else if (req.user.role === "employer") {
      // If the logged-in user is an employer
      userDetails = await Employer.findOne({ _id: req.user.userId });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid user role" });
    }

    if (!userDetails) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User or employer not found" });
    }

    // Remove sensitive data (e.g., password) before sending the response
    const userWithoutPassword = userDetails.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred" });
  }
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
