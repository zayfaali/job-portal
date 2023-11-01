import { Router } from "express";
import {
  applyJob,
  getApplication,
  getApplications,
  getUserApplications,
  showApplicationStats,
  updatedJobApplication,
} from "../controllers/applicationController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/").get(getApplications);
router.route("/user-application").get(getUserApplications);
router.route("/application-stats").get(showApplicationStats);

router
  .route("/:jobId")
  .get(getApplication)
  .post(applyJob)
  .patch(validateJobInput, updatedJobApplication);

export default router;
