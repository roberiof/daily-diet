import { z } from "zod";

export default z
  .string({ required_error: "Enter your password" })
  .min(8, "Digit at least 8 characters")
  .regex(/^\S+$/g, "The password must not have spaces")
  .regex(
    /^(?=.*\d)(?=.*[a-zA-Z]).{8}$/gm,
    "The password must at least have 1 number "
  );
