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
      })
      .header("authorization", accessToken)
      .status(200)
      .json({
        message: "Giriş işlemi başarılı!",
        user: {
          id: auth.user.id,
          email: auth.user.email,
          name: auth.user.name,
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

  return res
    .header("authorization", accessToken)
    .status(200)
    .json({ message: "Token refreshed" });
};
