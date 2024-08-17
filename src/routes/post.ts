import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  removePostById,
  updatePostById,
} from "../controllers/post";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", removePostById);
router.put("/:id", updatePostById);

export default router;
