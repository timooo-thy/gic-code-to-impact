import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(0),
});

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(0),
});
