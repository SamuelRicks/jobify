import { Router } from "express";
import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationLayerMiddleware.js";
import { checkForTestUser } from "../middleware/authenticationMiddeware.js";

const router = Router();

import {
  getAllJobs,
  getJob,
  createJobs,
  updateJob,
  deleteJob,
  stats,
} from "../controllers/jobController.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJobs);

router.route("/stats").get(stats);
router
  .route("/:id")
  .get(validateIdParams, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParams, updateJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
