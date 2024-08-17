import { prisma } from "../../utils/db";
import { publishedTimeAgo } from "../../utils/general";
import { PostType } from "./types";

export const _getAllPosts = async ({
  universityId,
  departmentId,
  level,
  classId,
  postType,
  pageNumber,
  pageSize,
  slug,
}) => {
  const posts = await prisma.post.findMany({
    skip: pageNumber * pageSize,
    take: pageSize,
    where: {
      universityId,
      postType,
      category: {
        slug: slug ? { in: slug } : undefined,
      },
    },
  });

  const count = await prisma.post.count({
    where: {
      universityId,
      postType,
      category: {
        slug: slug ? { in: slug } : undefined,
      },
    },
  });

  if (!posts) {
    throw new Error("Herhangi bir gönderi bulunamadı.");
  }

  const data = posts.map((post) => ({
    ...post,
    timeAgo: publishedTimeAgo(post.createdAt),
  }));

  return { data, count };
};

export const _getPostById = async (id: string, postType: PostType) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      image: postType === PostType.TEXT,
      tags: true,
      likedUsers: true,
      category: postType === PostType.TEXT && {
        select: {
          name: true,
          slug: true,
        },
      },
      department: postType === PostType.FILE && {
        select: {
          name: true,
          slug: true,
        },
      },
      files: postType === PostType.FILE && {
        select: {
          id: true,
          name: true,
          size: true,
          type: true,
          url: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          image: true,
          department: {
            select: {
              name: true,
            },
          },
          university: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    throw new Error("Gönderi bulunamadı.");
  }

  return post;
};

export const _removePostById = async (id: string) => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  if (!post) {
    throw new Error("Gönderi silinemedi.");
  }

  return post;
};

export const _updatePostById = async (id: string, data: any) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
  });

  if (!post) {
    throw new Error("Gönderi güncellenemedi.");
  }

  return post;
};
