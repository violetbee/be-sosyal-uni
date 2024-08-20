import { NextFunction, Response } from "express";
import { prisma } from "../utils/db";
import { CustomRequest } from "./auth";
import { JwtUser } from "../routes/types";

export const isUniversitySelected = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      selectedUniversityId: true,
    },
  });

  const { selectedUniversityId } = data!;

  if (!selectedUniversityId) {
    return res.status(400).json({
      message:
        "Herhangi bir üniversite seçili değil. Lütfen profil ayarlarınızdan bir üniversite seçiniz.",
    });
  }

  req.user = { ...req.user, selectedUniversityId } as JwtUser;

  next();
};

export const isAbleToCreateAction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  next();
};
