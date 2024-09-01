import { z } from "zod";

import email from "@/common/validation/email";
import name from "@/common/validation/name";
import image from "@/common/validation/image";

export default z.object({
  image,
  name,
  email
});
