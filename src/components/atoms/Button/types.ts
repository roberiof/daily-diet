import { ReactElement } from "react";
import { TouchableOpacityProps, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactElement | string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  variant?:
    | "outlined"
    | "contained"
    | "greenSelected"
    | "greenNotSelected"
    | "redSelected"
    | "redNotSelected";
}
