import { TextInput, View } from "react-native";
import { useController } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Text } from "../Text/text";

import { InputProps } from "./types";

const Input = ({
  name,
  control,
  error = null,
  className,
  label,
  ...props
}: InputProps) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name
  });

  return (
    <View style={{ gap: 4 }} className={cn("w-full", className)}>
      <Text>{label}</Text>
      <TextInput
        autoCapitalize="none"
        className={cn(
          "px-5 py-2 rounded-lg border-2  border-dark-green-200",
          error ? "border-red-600" : "border-dark-green-200"
        )}
        value={field.value}
        onChangeText={field.onChange}
        placeholderTextColor="#A1A4A1"
        {...props}
      />
      {!!error && (
        <Text size="xs" type={"error"} className="self-end">
          *{error}
        </Text>
      )}
    </View>
  );
};

export default Input;
