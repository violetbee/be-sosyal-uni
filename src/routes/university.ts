import { Router } from "express";
import {
  getAllClasses,
  getAllDepartmentsById,
  getAllDepartmentsByUser,
  getAllUniversities,
  joinUniversity,
} from "../controllers/university";
import { validateData } from "../middlewares/validation";
import { joinUniversityScheme } from "../controllers/university/schemes/index.scheme";

const router = Router();

// UNIVERSITY ROUTES
router.get("/", getAllUniversities);
router.put("/join", validateData(joinUniversityScheme), joinUniversity);

// DEPARTMENT ROUTES
router.get("/departments/:universityId", getAllDepartmentsById);
router.get("/departments-by-me", getAllDepartmentsByUser);

// CLASS ROUTES
router.get("/classes/:departmentId/:level", getAllClasses);

export default router;
