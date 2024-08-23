import { prisma } from "../../utils/db";

export const _likeComment = async (targetCommentId: string, userId: string) => {
  const isLikedBefore = await prisma.likedComments.findFirst({
    where: {
      commentId: targetCommentId,
      userId,
    },
  });

  if (isLikedBefore) {
    await prisma.likedPosts.delete({
      where: {
        postId_userId: {
          postId: targetCommentId,
          userId,
        },
      },
    });

    return {
      message: "Yorum beğenisi kaldırıldı.",
    };
  }

  await prisma.likedPosts.create({
    data: {
      postId: targetCommentId,
      userId,
    },
  });

  return {
    message: "Yorum beğenildi.",
  };
};
