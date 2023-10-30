import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Employer from "../models/EmployerModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../customErrors/customError.js";

export const register = async (req, res) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// EmployerControllers

export const registerEmployer = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const employer = await Employer.create(req.body);
    res.status(StatusCodes.CREATED).json({ employer });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginEmployer = async (req, res) => {
  // check if user exists
  // check if password is correct

  const employer = await Employer.findOne({ email: req.body.email });

  if (!employer) throw new UnauthenticatedError("invalid credentials");

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    employer.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: employer._id, role: employer.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "employer logged in" });
};
