import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  placeholder: string;
  name?: string;
  type: string;
  label?: string;
  labelStyles?: string;
  styles?: string;
  error?: string;
  register?: UseFormRegisterReturn; // Correct typing for react-hook-form
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type,
      placeholder,
      styles = "",
      label,
      labelStyles = "",
      register,
      name,
      error,
    }: TextInputProps,
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#666666] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : false}
          />
          {error && (
            <p className="text-[#e36060] text-xs mt-1 ml-2" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput"; // Necessary for forwardRef
export default TextInput;
