import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir email adresi giriniz.",
  }),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  name: z.string({
    message: "Kullanıcı adı boş olamaz.",
  }),
  surname: z.string({
    message: "Kullanıcı soyadı boş olamaz.",
  }),
  universityId: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir email adresi giriniz.",
  }),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});
