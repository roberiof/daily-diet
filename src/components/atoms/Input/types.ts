import { TextInputProps, ViewProps } from "react-native";
import { Control } from "react-hook-form";

export interface InputProps extends TextInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  className?: ViewProps["className"];
  error?: string | null;
  label: string;
}
