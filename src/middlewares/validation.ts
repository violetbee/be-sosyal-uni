import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema: z.ZodObject<any, any> | Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof schema === "function") {
        schema(req.body).parse(req.body);
        return next();
      }
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: issue.message,
        }));
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "Geçersiz veri. Lütfen kontrol edin.",
          details: errorMessages,
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
    }
  };
}
