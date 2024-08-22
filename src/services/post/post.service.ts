import { prisma } from "../../utils/db";
import { publishedTimeAgo, slugify } from "../../utils/general";
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
    orderBy: {
      createdAt: "desc",
    },
    skip: (+pageNumber - 1) * +pageSize,
    take: +pageSize,
    where: {
      universityId,
      departmentId,
      class: {
        level,
      },
      classId,
      postType,
      category: {
        slug: slug ? { in: slug } : undefined,
      },
    },
    include: {
      likes: {
        select: {
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

  const count = await prisma.post.count({
    where: {
      universityId,
      departmentId,
      class: {
        level,
      },
      classId,
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

export const _createPost = async (data: any) => {
  const post = await prisma.post.create({
    data: {
      ...data,
      slug: await slugify(data.title, prisma),
      files: data.postType === PostType.FILE &&
        data.files.length > 0 && {
          createMany: {
            data: data.files.map((file: any) => ({
              name: file.name,
              size: file.size,
              type: file.type,
              url: file.url,
            })),
          },
        },
    },
  });

  if (!post) {
    throw new Error("Gönderi oluşturulurken bir hata oluştu.");
  }

  return post;
};

export const _getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      postType: true,
      image: true,
      tags: true,
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
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      department: {
        select: {
          name: true,
          slug: true,
        },
      },
      files: {
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

  const postType = post.postType as PostType;

  return {
    ...post,
    image: postType === PostType.TEXT ? post.image : null,
    category: postType === PostType.TEXT ? post.category : null,
    department: postType === PostType.FILE ? post.department : null,
    files: postType === PostType.FILE ? post.files : null,
    timeAgo: publishedTimeAgo(post.createdAt),
  };
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
