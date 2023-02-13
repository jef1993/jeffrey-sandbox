import React, { SetStateAction, useState } from "react";
import useInput from "./useInput";

import show from "../../assets/icons/show.svg";
import hide from "../../assets/icons/hide.svg";

interface InputProps {
  name?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  hasPasswordRestriction?: boolean;
}

const Input: React.FC<InputProps> = ({
  name = "label",
  value = "",
  onChange = () => {},
  type = "text",
  errorText = "",
  hasPasswordRestriction = false,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const blurHandler = () => {
    if (!isTouched) setIsTouched(true);
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input">
      <label className="input__label" htmlFor={`input-${name}`}>
        {name}
      </label>
      <div className="input__error">
        <span className="input__error__text">{isTouched && errorText}</span>
      </div>
      <div className="input__field">
        <input
          title={name}
          className={`input__field__input`}
          value={value}
          onChange={onChange}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          onBlur={blurHandler}
          placeholder="please enter"
          aria-invalid={isTouched && errorText ? "true" : "false"}
        ></input>
        {type === "password" && (
          <button
            className="input__field__show"
            type="button"
            onClick={showPasswordHandler}
          >
            <img
              src={showPassword ? hide : show}
              alt={showPassword ? "hide" : "show"}
            ></img>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
