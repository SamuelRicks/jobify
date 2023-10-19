import { login, logout, register } from "../controllers/authController.js";
import { Router } from "express";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validationLayerMiddleware.js";

const router = Router();

router.route("/login").post(loginValidation, login);
router.route("/register").post(registerValidation, register);
router.route("/logout").get(logout);

export default router;
