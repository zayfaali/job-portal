import { Router } from "express";
import {
  applyJob,
  getApplication,
  getApplications,
  getUserApplications,
  updatedJobApplication,
} from "../controllers/applicationController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/").get(getApplications);
router.route("/user-application").get(getUserApplications);
router
  .route("/:jobId")
  .get(getApplication)
  .post(applyJob)
  .patch(validateJobInput, updatedJobApplication);

export default router;
