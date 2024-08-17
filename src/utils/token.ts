import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../routes/types";

export const generateToken = (decoder: JwtPayload, type = "access") => {
  const { id, email } = decoder;
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: type === "access" ? "30m" : "10d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtUser | JwtPayload;
};
