import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../routes/types";

export interface CustomRequest extends Request {
  user?: JwtUser;
}

export const AuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ error: "Yetkisiz erişim." });
  }
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as JwtUser;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Geçersiz token." });
  }
};
