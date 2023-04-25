import React, { useState } from "react";

const useController = (min: number, max: number) => {
  const [value, setValue] = useState<number>(0);

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
