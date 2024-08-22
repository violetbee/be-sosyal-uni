import { Request, Response } from "express";
import {
  _createPost,
  _getAllPosts,
  _getPostById,
  _removePostById,
  _updatePostById,
} from "../../services/post/post.service";
import { CustomRequest } from "../../middlewares/auth";
import { CreatePostScheme } from "./schemes/index.scheme";

export const getAllPosts = async (req: CustomRequest, res: Response) => {
  const { departmentId, level, classId, postType, pageSize, pageNumber, slug } =
    req.query;

  const universityId = req.user?.selectedUniversityId;

  try {
    const posts = await _getAllPosts({
      universityId,
      departmentId,
      level,
      classId,
      postType,
      pageSize,
      pageNumber,
      slug,
    });
    return res.status(200).json({
      data: posts.data,
      message: "Gönderiler başarıyla getirildi.",
      totalPage: Math.ceil(posts.count / Number(pageSize)),
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await _getPostById(id);
    return res.status(200).json({
      data: post,
      message: "Gönderi başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createPost = async (req: CustomRequest, res: Response) => {
  const data = req.body as CreatePostScheme;
  const universityId = req.user?.selectedUniversityId;
  try {
    await _createPost({ ...data, universityId });
    return res.status(201).json({
      message: "Gönderi başarıyla oluşturuldu.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const removePostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await _removePostById(id);
    return res.status(200).json({
      message: "Gönderi başarıyla silindi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await _updatePostById(id, data);
    return res.status(200).json({
      message: "Gönderi başarıyla güncellendi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
