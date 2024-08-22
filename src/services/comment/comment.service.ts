import { prisma } from "../../utils/db";

export const _getCommentsByPostId = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      user: {
        include: {
          department: {
            select: {
              name: true,
            },
          },
        },
      },
      createdAt: true,
      likes: {
        include: {
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return comments;
};
