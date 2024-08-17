import { prisma } from "../../utils/db";

export const _getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: { password: true },
  });

  if (users === null) {
    throw new Error("Kullanıcılar getirilemedi.");
  }

  return users;
};

export const _getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error(`${id} ID'li bir kullanıcı bulunamadı.`);
  }
  return user;
};
