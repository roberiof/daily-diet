import { z } from "zod";

export default z
  .string({ required_error: "Enter your name" })
  .min(4, "It should has at least 4 characters")
  .regex(/^[A-zÀ-ú-\s]+$/, "Don't utilize special characters")
  .regex(/^(.*\s)+.+(\s)?$/, "Include your last name")
  .transform((value) => value.replace(/\s+/g, " ").trim());
