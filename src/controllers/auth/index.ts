import { Request, Response } from "express";
import { generateToken, verifyToken } from "../../utils/token";
import { _login, _register } from "../../services/auth/auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const auth = await _login(email, password);

    const { accessToken, refreshToken } = auth;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Giriş işlemi başarılı!",
        user: {
          id: auth.user.id,
          email: auth.user.email,
          name: auth.user.name,
          accessToken,
          createdAt: Date.now(),
          expireDate: Date.now() + 1000 * 60 * 30,
        },
      });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await _register(req.body);

    return res.status(201).json({
      data: user,
      message: "Hesabınız başarıyla oluşturuldu.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const { id, email } = verifyToken(refreshToken);
  const accessToken = generateToken({ id, email });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({
    accessToken,
    createdAt: Date.now(),
    expireDate: Date.now() + 1000 * 60 * 30,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Çıkış işlemi başarılı!" });
};
