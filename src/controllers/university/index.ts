import { Request, Response } from "express";
import {
  _getAllClasses,
  _getAllDepartmentsByUser,
  _getAllUniversities,
  _joinUniversity,
} from "../../services/university/university.service";
import { CustomRequest } from "../../middlewares/auth";

export const getAllUniversities = async (req: Request, res: Response) => {
  const universityName = req.query.universityName;

  try {
    const universities = await _getAllUniversities({ universityName });

    return res.status(200).json({
      data: universities,
      message: "Üniversiteler başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const joinUniversity = async (req: CustomRequest, res: Response) => {
  const { universityId } = req.body;
  const userId = req.user?.id;

  try {
    await _joinUniversity({ userId, universityId });

    return res.status(200).json({
      message: "Üniversiteye başarıyla katılım sağlandı.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllDepartmentsById = async (
  req: CustomRequest,
  res: Response
) => {
  const universityId = req.params.universityId;

  try {
    const departments = await _getAllDepartmentsByUser(universityId);

    return res.status(200).json({
      data: departments,
      message: "Bölümler başarıyla getirildi",
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getAllDepartmentsByUser = async (
  req: CustomRequest,
  res: Response
) => {
  const universityId = req.user?.selectedUniversityId!;

  try {
    const departments = await _getAllDepartmentsByUser(universityId);

    return res.status(200).json({
      data: departments,
      message: "Bölümler başarıyla getirildi",
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getAllClasses = async (req: CustomRequest, res: Response) => {
  const { departmentId, level } = req.params;

  try {
    const classes = await _getAllClasses(departmentId, +level);

    return res.status(200).json({
      data: classes,
      message: "Dersler başarıyla getirildi",
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
