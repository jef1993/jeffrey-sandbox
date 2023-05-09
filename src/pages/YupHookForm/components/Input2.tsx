import React, { useId, useEffect, useState } from "react";
import { FieldError, FieldValues, UseFormReturn } from "react-hook-form";
import { ObjectSchema } from "yup";
import { inputProperties } from "./InputConfigs";

export interface Input2Props {
  className?: string;
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string;
  fieldName: string;
  fieldType?: keyof typeof inputProperties;
  form: UseFormReturn<FieldValues>;
  placeholder?: string;
}

const Input2: React.FC<Input2Props> = ({
  className = "",
  label = "",
  defaultValue,
  form,
  fieldName,
  fieldType = "",
  placeholder,
  inputProps = {},
}) => {
  const inputId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[fieldName];
  const isFieldError = (error: any): error is FieldError => {
    return (error as FieldError).message !== undefined;
  };
  const inputTypeProps = inputProperties[fieldType || fieldName] || {};

  const focusHandler = () => {
    if (!isFocused) setIsFocused(true);
  };

  console.log(error?.type);

  return (
    <div className={`input2${className}`}>
      <label htmlFor={inputId} className="input2__label">
        {label}
      </label>
      {error && isFieldError(error) && (
        <span className="input2__error">{error?.message}</span>
      )}
      <input
        className="input2__input"
        defaultValue={defaultValue}
        {...register(fieldName)}
        onBlur={(e) => {
          e.target.value = e.target.value.trim().replace(/\s{2,}/, " ");
        }}
        onFocus={focusHandler}
        id={inputId}
        aria-describedby={inputId}
        placeholder={placeholder}
        {...inputTypeProps}
        aria-invalid={error && isFieldError(error)}
      />
    </div>
  );
};

export default Input2;
