import { z } from "zod";

import email from "@/common/validation/email";
import name from "@/common/validation/name";
import password from "@/common/validation/password";
import image from "@/common/validation/image";

export default z
  .object({
    image,
    name,
    email,
    password,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"]
  });
