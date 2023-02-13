import React, { useState, useEffect, SetStateAction } from "react";

const useInput = (
  initialValue: string | number = "",
  type = "text",
  isRequired = false
) => {
  const [value, setValue] = useState(initialValue);
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isRequired && `${value}`.trim() === "") {
      setErrorText("This field is required");
    } else {
      setErrorText("");
    }
  }, [isRequired, value]);

  return { value, onChange: changehandler, type, errorText };
};

export default useInput;
