import { z } from "zod";

export const likePostScheme = z.object({
  postId: z
    .string({
      message: "postId is required",
    })
    .min(1),
});

export const likeCommentScheme = z.object({
  commentId: z
    .string({
      message: "commentId is required",
    })
    .min(1),
});
