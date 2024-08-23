import { Router } from "express";
import { likeComment, likePost } from "../controllers/like";
import { validateData } from "../middlewares/validation";
import {
  likeCommentScheme,
  likePostScheme,
} from "../controllers/like/schemes/index.scheme";

const router = Router();

router.post("/post", validateData(likePostScheme), likePost);
router.post("/comment", validateData(likeCommentScheme), likeComment);

export default router;
