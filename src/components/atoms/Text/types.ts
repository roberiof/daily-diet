import { Text } from "react-native";
import { VariantProps } from "tailwind-variants";

import { textVariants } from "./text";

export type TextVariants = VariantProps<typeof textVariants>;

export type TextProps = Text["props"] & TextVariants;
