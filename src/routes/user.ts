import { Router } from "express";
import { getAllUsers, getMe, getUserById } from "../controllers/user";
import { isUniversitySelected } from "../middlewares/permissions";

const router = Router();

router.get("/", isUniversitySelected, getAllUsers);
router.get("/me", getMe);
router.get("/:id", isUniversitySelected, getUserById);

export default router;
