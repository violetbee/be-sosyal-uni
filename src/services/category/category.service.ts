import { prisma } from "../../utils/db";

export const _getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return categories;
};
