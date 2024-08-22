import { Router } from "express";
import { getCommentsByPostId } from "../controllers/comment";

const router = Router();

router.get("/:postId", getCommentsByPostId);

export default router;
