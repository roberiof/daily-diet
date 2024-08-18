import { Control, FieldValues, Path } from "react-hook-form";

export interface ImagePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
}
