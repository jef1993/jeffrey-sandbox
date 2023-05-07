import { useId } from "react";

import {
  FieldError,
  UseFormReturn,
  UseFormRegister,
  UseFormTrigger,
  FormState,
} from "react-hook-form";

export interface Input2Props {
  className?: string;
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string;
  fieldName: string;
  form: UseFormReturn<any>;
}

const Input2: React.FC<Input2Props> = ({
  className = "",
  label = "",
  defaultValue,
  fieldName,
  inputProps = {},
  form,
}) => {
  const inputId = useId();
  const { register, formState, trigger } = form;
  const error = formState?.errors[fieldName];
  const isFieldError = (error: any): error is FieldError => {
    return (error as FieldError).message !== undefined;
  };

  console.log(error);

  return (
    <div className={`input2${className}`}>
      <label htmlFor={inputId} className="input2__label">
        {label}
      </label>
      {error && isFieldError(error) && (
        <span id={inputId} className="input2__error">
          {error?.message}
        </span>
      )}
      <input
        className="input2__input"
        defaultValue={defaultValue}
        placeholder="name"
        {...register(fieldName)}
        {...inputProps}
        onBlur={async () => {
          const result = trigger(fieldName);
        }}
        id={inputId}
        aria-describedby={inputId}
      />
    </div>
  );
};

export default Input2;
