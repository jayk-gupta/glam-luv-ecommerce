import { ReactNode } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "../form"
import { Input } from "../input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>; // Ensures the name is a valid key of the form values
  label: string;
  placeholder: string;
  type?: string;
  form: UseFormReturn<T>; // Pass the form object for type inference
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  autoComplete?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  form,
  disabled = false,
  className = "",
  autoComplete,
}: FormInputProps<T>) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <div className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative pt-2  flex items-center">
              <Input
                className=" "
                placeholder={placeholder}
                autoComplete={autoComplete}
                type={type}
                {...field}
                disabled={disabled}
              />
            </div>
          </FormControl>
          <FormMessage />
        </div>
      )}
    ></FormField>
  );
};
