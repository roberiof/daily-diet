import { TouchableOpacityProps, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  children: string;
  style?: StyleProp<ViewStyle>;
  variant?:
    | "outlined"
    | "contained"
    | "greenSelected"
    | "greenNotSelected"
    | "redSelected"
    | "redNotSelected";
}
