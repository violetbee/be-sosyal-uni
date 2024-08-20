import { z } from "zod";
import { PostType } from "../../../services/post/types";

export const createPostSchemeByPostType = ({
  postType,
}: {
  postType: PostType;
}) => {
  if (postType !== "text" && postType !== "file") {
    throw new Error("Geçersiz gönderi türü.");
  }

  if (postType === "text") {
    return z.object({
      title: z
        .string({
          message: "Gönderi başlığı zorunludur.",
        })
        .min(5, {
          message: "Gönderi başlığı en az 5 karakter olmalıdır.",
        })
        .max(100, {
          message: "Gönderi başlığı en fazla 100 karakter olmalıdır.",
        }),
      content: z
        .string({
          message: "Gönderi içeriği zorunludur.",
        })
        .min(10, {
          message: "Gönderi içeriği en az 10 karakter olmalıdır.",
        })
        .max(5000, {
          message: "Gönderi içeriği en fazla 5000 karakter olmalıdır.",
        }),
      postType: z.literal("text", {
        message: "Gönderi tipi text olmalıdır.",
      }),
      categoryId: z.string({ message: "Kategori id'si zorunludur." }),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    });
  }

  if (postType === "file") {
    return z.object({
      title: z
        .string({
          message: "Gönderi başlığı zorunludur.",
        })
        .min(5, {
          message: "Gönderi başlığı en az 5 karakter olmalıdır.",
        })
        .max(100, {
          message: "Gönderi başlığı en fazla 100 karakter olmalıdır.",
        }),
      content: z
        .string({
          message: "Gönderi içeriği zorunludur.",
        })
        .min(10, {
          message: "Gönderi içeriği en az 10 karakter olmalıdır.",
        })
        .max(5000, {
          message: "Gönderi içeriği en fazla 5000 karakter olmalıdır.",
        }),
      postType: z.literal("file", {
        message: "Gönderi tipi file olmalıdır.",
      }),
      departmentId: z.string({ message: "Bölüm id'si zorunludur." }),
      classId: z.string({ message: "Ders id'si zorunludur." }),
      files: z
        .array(
          z.object({
            name: z.string({ message: "Dosya adı zorunludur." }),
            size: z.number({ message: "Dosya boyutu zorunludur." }),
            type: z.string({ message: "Dosya tipi zorunludur." }),
            url: z.string({ message: "Dosya url'si zorunludur." }),
          }),
          {
            message:
              "Dosya türünde bir paylaşım yaptığınız için en az bir dosya yüklemelisiniz.",
          }
        )
        .max(8, {
          message: "En fazla 8 dosya yükleyebilirsiniz.",
        }),
      tags: z.array(z.string()).optional(),
    });
  }

  throw new Error("Geçersiz postType");
};

export type CreatePostScheme = z.infer<
  ReturnType<typeof createPostSchemeByPostType>
>;
