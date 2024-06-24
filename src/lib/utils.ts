import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassValue } from "tailwind-variants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const timestampToDate = (
  data?: {
    seconds: number;
    nanoseconds: number;
  } | null
): Date => {
  if (!data) {
    return new Date();
  }
  const milliseconds = data.seconds * 1000 + data.nanoseconds / 1000000;
  return new Date(milliseconds);
};
