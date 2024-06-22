import { z } from "zod";

export default z
  .string({ required_error: "Enter a valid email address" })
  .email("Enter a valid email address")
  .transform((v) => v.trim());
