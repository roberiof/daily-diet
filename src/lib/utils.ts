import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassValue } from "tailwind-variants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
