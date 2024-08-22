import { Router } from "express";
import { getAllEvents, getEventDetailsById } from "../controllers/event";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventDetailsById);

export default router;
