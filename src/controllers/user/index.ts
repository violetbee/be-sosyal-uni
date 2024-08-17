import { Request, Response } from "express";
import { _getAllUsers, _getUserById } from "../../services/user/user.service";
import { CustomRequest } from "../../middlewares/auth";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await _getAllUsers();
    return res.status(200).json({
      data: users,
      message: "Kullanıcılar başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    const user = await _getUserById(id);
    return res.status(200).json({
      data: user,
      message: "Kullanıcı başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getMe = async (req: CustomRequest, res: Response) => {
  const { id } = req.user!;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    const user = await _getUserById(id);
    return res.status(200).json({
      data: user,
      message: "Kullanıcı başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
