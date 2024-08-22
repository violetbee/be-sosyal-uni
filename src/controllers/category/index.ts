import { Request, Response } from "express";
import { _getAllCategories } from "../../services/category/category.service";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await _getAllCategories();

    return res.status(200).json({
      data: categories,
      message: "Kategoriler başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
