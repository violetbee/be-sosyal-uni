import { z } from "zod";

export const joinUniversityScheme = z.object({
  universityId: z.string({ message: "Üniversite id'si zorunludur." }),
});
