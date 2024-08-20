import { NextFunction, Request, Response } from "express";
import { RestrictRoutes } from "./types";

export const restrictRoutes = (
  cb: RestrictRoutes,
  exceptedRoutes: string[]
) => {
  const whiteList = exceptedRoutes;

  return (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.includes(`/${req.originalUrl.split("/")[1]}`)) {
      return next();
    }

    if (whiteList.includes(req.originalUrl)) {
      return next();
    }

    cb(req, res, next);
  };
};
