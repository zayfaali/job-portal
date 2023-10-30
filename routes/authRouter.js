import { Router } from "express";
import {
  validateEmployerRegisterInput,
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
import {
  register,
  login,
  logout,
  registerEmployer,
  loginEmployer,
} from "../controllers/authController.js";
const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.post(
  "/register-employer",
  validateEmployerRegisterInput,
  registerEmployer
);
router.post("/login-employer", validateLoginInput, loginEmployer);

export default router;
