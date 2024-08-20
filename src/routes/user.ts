import { Router } from "express";
import { getAllUsers, getMe, getUserById } from "../controllers/user";
import { isUniversitySelected } from "../middlewares/permissions";

const router = Router();

router.get("/", getAllUsers);
router.get("/me", getMe);
router.get("/:id", getUserById);

export default router;
