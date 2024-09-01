import { z } from "zod";

export default z
  .string()
  .url("The string must be a valid URL")
  .or(
    z
      .string()
      .regex(
        /^data:image\/[a-z]+;base64,/,
        "The string must be a valid base64 encoded image"
      )
  );
