import { z } from "zod";

import email from "@/common/validation/email";
import name from "@/common/validation/name";
import password from "@/common/validation/password";

export default z
  .object({
    name,
    email,
    password,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"]
  });
