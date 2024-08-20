import { Router } from "express";
import { validateData } from "../middlewares/validation";
import {
  createPost,
  getAllPosts,
  getPostById,
  removePostById,
  updatePostById,
} from "../controllers/post";
import { createPostSchemeByPostType } from "../controllers/post/schemes/index.scheme";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", removePostById);
router.put("/:id", updatePostById);
router.post("/create", validateData(createPostSchemeByPostType), createPost);

export default router;
