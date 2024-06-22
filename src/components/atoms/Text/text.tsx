import { Text as DefaultText } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { tv } from "tailwind-variants";

import { TextProps } from "./types";

export const textVariants = tv({
  base: "text-system-black",
  variants: {
    type: {
      error: "text-red-600"
    },
    weight: {
      regular: "font-worksans-regular",
      medium: "font-worksans-medium",
      semibold: "font-worksans-semibold",
      bold: "font-worksans-bold"
    },
    size: {
      xxs: "leading-[14px]",
      xs: "leading-[16px]",
      sm: "leading-[20px]",
      md: `leading-[22px]`,
      lg: "leading-[30px]"
    }
  },
  defaultVariants: {
    weight: "regular",
    color: "black",
    size: "md"
  }
});

const generateFontSize = (size: string) => {
  if (size === "xxs") {
    return RFValue(10);
  }

  if (size === "xs") {
    return RFValue(12);
  }

  if (size === "sm") {
    return RFValue(14);
  }

  if (size === "md") {
    return RFValue(16);
  }

  if (size === "lg") {
    return RFValue(22);
  }

  return RFValue(16);
};

export const Text = ({
  className,
  weight,
  size,
  type,
  ...props
}: TextProps) => {
  const fontSize = generateFontSize(size as string);

  return (
    <DefaultText
      className={textVariants({ className, type, weight, size })}
      style={{
        fontSize
      }}
      {...props}
    />
  );
};
