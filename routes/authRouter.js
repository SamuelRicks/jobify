import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validationLayerMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: { msg: "IP rate limit exceeded, try in 15 minutes." },
});

const router = Router();

router.route("/login").post(apiLimiter, loginValidation, login);
router.route("/register").post(apiLimiter, registerValidation, register);
router.route("/logout").get(logout);

export default router;
