import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import hashPassword, { comparePassword } from "../utils/hashPssword.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid email");
  const correctPassword = await comparePassword(
    req.body.password,
    user.password
  );
  if (!correctPassword) throw new UnauthenticatedError("invalid password");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ msg: "user is logged in" });
};

export const register = async (req, res) => {
  const firstDocument = (await User.countDocuments()) === 0;
  req.body.role = firstDocument ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "the user is created" });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
