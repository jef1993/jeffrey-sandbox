import React, { useState } from "react";

const useController = (min: number, max: number, initialValue: number = 0) => {
  const [value, setValue] = useState<number>(initialValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = +e.target.value;
    if (targetValue >= min && targetValue <= max) {
      setValue(targetValue);
    }
  };

  return {
    min,
    max,
    value,
    setValue,
    onChange: changeHandler,
  };
};

export default useController;
