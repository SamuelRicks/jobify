import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationLayerMiddleware.js";
import {
  authorizedUser,
  checkForTestUser,
} from "../middleware/authenticationMiddeware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get([authorizedUser("admin"), getApplicationStats]);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUser,
    updateUser
  );

export default router;
