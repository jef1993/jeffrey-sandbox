import React, { useState } from "react";
import Controller from "./Controller";

type ControlRange = { min: number; max: number; step: number };

interface TransformState {
  translate: { x: number; y: number };
  scale: { x: number; y: number };
  rotate: { angle: number; cx: number; cy: number };
  skew: { x: number; y: number };
}

type ControlMap = {
  [key in keyof TransformState]: {
    [innerKey in keyof TransformState[key]]: ControlRange;
  };
};

const initTransform: TransformState = {
  translate: { x: 0, y: 0 },
  scale: { x: 1, y: 1 },
  rotate: { angle: 0, cx: 0, cy: 0 },
  skew: { x: 0, y: 0 },
};

const useTransformController = (height: number, width: number) => {
  const [transform, setTransform] = useState<TransformState>(initTransform);
  const { translate, scale, rotate, skew } = transform;
  const transformValue = `
  translate(${translate.x}, ${translate.y}) 
  scale(${scale.x}, ${scale.y}) 
  skewX(${skew.x}) 
  skewY(${skew.y}) 
  rotate(${rotate.angle} ${rotate.cx} ${rotate.cy})`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof TransformState,
    innerKey: keyof TransformState[typeof key]
  ) => {
    const targetValue = +e.target.value;
    setTransform((prevTransform) => ({
      ...prevTransform,
      [key]: { ...prevTransform[key], [innerKey]: targetValue },
    }));
  };

  const transformControlsMap: ControlMap = {
    translate: {
      x: { min: 0, max: 200, step: 1 },
      y: { min: 0, max: 200, step: 1 },
    },
    scale: {
      x: { min: 0.1, max: 3, step: 0.01 },
      y: { min: 0.1, max: 3, step: 0.01 },
    },
    rotate: {
      angle: { min: 0, max: 360, step: 1 },
      cx: { min: -height * 2, max: height * 2, step: 1 },
      cy: { min: -height * 2, max: height * 2, step: 1 },
    },
    skew: {
      x: { min: -90, max: 90, step: 1 },
      y: { min: -90, max: 90, step: 1 },
    },
  };

  const controls = (
    <div className="controls">
      {Object.entries(transformControlsMap).map(([key, value]) => {
        const typedKey = key as keyof typeof transformControlsMap;
        return (
          <div key={typedKey} className="controls__ctn">
            <p className="controls__title">{typedKey}</p>
            {Object.entries(value).map(([innerKey, innerValue]) => {
              const typedInnerKey =
                innerKey as keyof (typeof transformControlsMap)[typeof typedKey];
              return (
                <Controller
                  key={innerKey}
                  label={innerKey}
                  value={transform[typedKey][typedInnerKey]}
                  onChange={(e) => {
                    handleInputChange(e, typedKey, typedInnerKey);
                  }}
                  min={innerValue.min}
                  max={innerValue.max}
                  step={innerValue.step}
                />
              );
            })}
          </div>
        );
      })}
      <button
        className="controls__reset-all"
        onClick={setTransform.bind(null, initTransform)}
      >
        Reset All
      </button>
    </div>
  );

  return {
    ...transform,
    transformValue,
    onChange: handleInputChange,
    controls,
  };
};

export default useTransformController;
