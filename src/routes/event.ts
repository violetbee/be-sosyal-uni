import { Router } from "express";
import { getAllEvents } from "../controllers/event";

const router = Router();

router.get("/", getAllEvents);

export default router;
