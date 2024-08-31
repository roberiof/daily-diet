import { z } from "zod";

const IsInsideDietEnum = z.enum(["yes", "no"]);

export default z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  date: z.date({ required_error: "Date is required" }),
  isInsideDiet: IsInsideDietEnum
});
