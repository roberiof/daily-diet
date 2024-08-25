import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { tv } from "tailwind-variants";

import { ButtonProps } from "./types";

export const buttonVariants = tv({
  base: "py-4 px-6 w-full rounded-[6px] text-center border-1 border-transparent disabled:opacity-30",
  variants: {
    variant: {
      contained: "bg-base-gray-700",
      outlined: "border-base-gray-700 bg-white",
      greenNotSelected: "bg-base-gray-200",
      redNotSelected: "bg-base-gray-200",
      greenSelected: "bg-green-light border-green-dark",
      redSelected: "bg-red-light border-red-dark"
    }
  },
  defaultVariants: {
    variant: "contained"
  }
});

export default function Button({
  children,
  className,
  variant = "contained",
  ...rest
}: ButtonProps) {
  const textVariant = {
    contained: "text-white",
    outlined: "text-base-gray-700",
    greenNotSelected: "text-base-gray-700",
    greenSelected: "text-base-gray-700",
    redNotSelected: "text-base-gray-700",
    redSelected: "text-base-gray-700"
  } as const;

  return (
    <TouchableOpacity
      className={buttonVariants({
        className,
        variant
      })}
      {...rest}
    >
      <Text
        className={`text-center font-bold flex items-center gap-2  ${textVariant[variant]}`}
      >
        {/* {["greenSelected", "greenNotSelected"].includes(variant) && (
          <View className="rounded-full w-[10px] h-[10px] bg-green-dark"></View>
        )}
        {["redSelected", "redNotSelected"].includes(variant) && (
          <View className="rounded-full w-[10px] h-[10px] bg-red-dark"></View>
        )} */}
        {children}
      </Text>
    </TouchableOpacity>
  );
}
