import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth";
import { validateData } from "../middlewares/validation";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../controllers/auth/schemes/index.scheme";

const router = Router();

router.post("/login", validateData(userLoginSchema), login);
router.post("/register", validateData(userRegisterSchema), register);
router.post("/refresh-token", refreshToken);
router.get("/logout", logout);

export default router;
