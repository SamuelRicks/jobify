import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundErrors } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const validationLayer = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("There is")) {
          throw new NotFoundErrors(errorMessage);
        }
        if (errorMessage[0].startsWith("Not the authorized")) {
          throw new BadRequestError(errorMessage);
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = validationLayer([
  body("company").notEmpty().withMessage("company name must be provided"),
  body("position").notEmpty().withMessage("position must be provided"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .notEmpty()
    .withMessage("invalid job status"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .notEmpty()
    .withMessage("Invalid type status"),
]);

export const validateIdParams = validationLayer([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError();
    const jobs = await Job.findById(value);
    if (!jobs) throw new NotFoundErrors(`There is no job with the id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isUser = req.user.userId === jobs.createdBy.toString();
    if (!isAdmin && !isUser)
      throw new BadRequestError("Not the authorized user");
  }),
]);

export const registerValidation = validationLayer([
  body("name")
    .notEmpty()
    .withMessage("please provide valid name")
    .isLength({ min: 3, max: 12 }),
  body("email")
    .notEmpty()
    .withMessage("please provide valid email")
    .isEmail()
    .withMessage("provide email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("user already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("please provide valid password")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters long"),
  body("location").notEmpty().withMessage("please provide your location"),
  body("lastName").notEmpty().withMessage("please provide your last name"),
]);

export const loginValidation = validationLayer([
  body("email")
    .notEmpty()
    .withMessage("please provide an email")
    .isEmail()
    .withMessage("Please provide valid email format"),
  body("password").notEmpty().withMessage("please provide password"),
]);

export const validateUpdateUser = validationLayer([
  body("name")
    .notEmpty()
    .withMessage("please provide valid name")
    .isLength({ min: 3, max: 12 }),
  body("email")
    .notEmpty()
    .withMessage("please provide valid email")
    .isEmail()
    .withMessage("provide email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("user already exist");
      }
    }),
  body("location").notEmpty().withMessage("please provide your location"),
  body("lastName").notEmpty().withMessage("please provide your last name"),
]);
