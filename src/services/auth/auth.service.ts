import { prisma } from "../../utils/db";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/token";
import { RegisterBody } from "./types";

export const _login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  const isEqual = await bcryptjs.compare(password, user.password!);

  if (!isEqual) {
    throw new Error("Geçersiz şifre.");
  }

  const accessToken = generateToken({ id: user.id, email: user.email });

  const refreshToken = generateToken(
    { id: user.id, email: user.email },
    "refresh"
  );

  return { accessToken, refreshToken, user };
};

export const _register = async (data: RegisterBody) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isUserExist) {
    throw new Error(
      "Bu e-posta adresi ile kayıtlı bir kullanıcı bulunmaktadır."
    );
  }

  const user = await prisma.user.create({
    data: {
      ...data,
      password: await bcryptjs.hash(data.password, 12),
    },
  });

  return user;
};
