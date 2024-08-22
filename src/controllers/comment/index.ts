import { Request, Response } from "express";
import { _getCommentsByPostId } from "../../services/comment/comment.service";

export const getCommentsByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const comments = await _getCommentsByPostId(String(postId));
    return res.status(200).json({
      data: comments,
      message: "Yorumlar başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
