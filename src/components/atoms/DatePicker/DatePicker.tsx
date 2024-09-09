import React, { useState } from "react";
import { useController } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import { DatePickerFieldProps } from "./types";
import { View } from "react-native";
import { Text } from "../Text/text";
import Button from "../Button/Button";
import { cn } from "@/lib/utils";

export default function DatePickerField({
  error = null,
  label,
  className,
  control,
  editable = true,
  name
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  const { field } = useController({
    control,
    defaultValue: new Date(),
    name
  });

  return (
    <>
      <View className="space-y-1">
        <Text>{label}</Text>
        <Button
          disabled={!editable}
          variant="outlined"
          className={cn(
            "px-6 py-3 pt-4 rounded-lg border-2 items-start justify-center text-start   m-0 border-dark-green-200",
            error ? "border-red-600" : "border-dark-green-200",
            !editable && "opacity-50",
            className
          )}
          onPress={() => setOpen(true)}
        >
          {field.value ? (
            <Text className="font-normal">
              {(field.value as Date).toLocaleDateString()}{" "}
              {(field.value as Date).toLocaleTimeString()}
            </Text>
          ) : (
            <Text className="text-[#A1A4A1] font-normal text-center">
              Click to add date
            </Text>
          )}
        </Button>

        <DatePicker
          modal
          open={open}
          date={field.value}
          onConfirm={(date) => {
            setOpen(false);
            field.onChange(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {!!error && (
          <Text size="xs" type={"error"} className="self-end">
            *{error}
          </Text>
        )}
      </View>
    </>
  );
}
