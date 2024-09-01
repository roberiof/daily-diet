/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";

export interface DatePickerFieldProps {
  control: Control<any>;
  name: string;
  className?: string;
  error?: string | null;
  label: string;
  editable?: boolean;
}
