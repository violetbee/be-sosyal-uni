import { NextFunction, Request, Response } from "express";

export type RestrictRoutes = {
  (req: Request, res: Response, next: NextFunction): void;
};
