import { Response } from "express";
import { CustomRequest } from "../../middlewares/auth";
import { JwtUser } from "../../routes/types";
import { _likePost } from "../../services/like/like.post.service";
import { _likeComment } from "../../services/like/like.comment.service";

export const likePost = async (req: CustomRequest, res: Response) => {
  const { targetPostId } = req.body;
  const { id } = req.user as JwtUser;

  try {
    const data = await _likePost(targetPostId, id);
    res.status(200).json({
      message: data.message,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const likeComment = async (req: CustomRequest, res: Response) => {
  const { targetCommentId } = req.body;
  const { id } = req.user as JwtUser;

  try {
    const data = await _likeComment(targetCommentId, id);
    res.status(200).json({
      message: data.message,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};
