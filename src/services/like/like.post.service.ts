import { prisma } from "../../utils/db";

export const _likePost = async (targetPostId: string, userId: string) => {
  const isLikedBefore = await prisma.likedPosts.findFirst({
    where: {
      postId: targetPostId,
      userId,
    },
  });

  if (isLikedBefore) {
    await prisma.likedPosts.delete({
      where: {
        postId_userId: {
          postId: targetPostId,
          userId,
        },
      },
    });

    return {
      message: "Gönderi beğenisi kaldırıldı.",
    };
  }

  await prisma.likedPosts.create({
    data: {
      postId: targetPostId,
      userId,
    },
  });

  return {
    message: "Gönderi beğenildi.",
  };
};
