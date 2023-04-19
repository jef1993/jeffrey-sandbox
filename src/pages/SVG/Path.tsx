import React, { useEffect, useState } from "react";
import { SVGCtn } from "./SVG";

const Path: React.FC = () => {
  const [count, setCount] = useState(1);
  const [isCountingUp, setCountingUp] = useState(true);
  const stairs = (
    svgSize: number,
    stairCount: number,
    yFirst: boolean = true
  ) => {
    const offset = 10;
    const stairSize = (svgSize - offset * 2) / stairCount;

    let points = `${offset}, ${svgSize - offset}`;
    for (let i = 0; i < stairCount; i++) {
      const currentX = stairSize * i + offset;
      const currentY = svgSize - currentX;
      const nextX = stairSize * (i + 1) + offset;
      const nextY = svgSize - nextX;
      if (yFirst) points = points + ` ${currentX},${nextY} ${nextX},${nextY}`;
      if (!yFirst) points = points + ` ${nextX},${currentY} ${nextX},${nextY}`;
    }
    return points;
  };

  useEffect(() => {
    if (count > 10) setCountingUp(false);
    if (count < 2) setCountingUp(true);
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (isCountingUp ? prev + 1 : prev - 1));
    }, 1000 / 30);

    return () => clearInterval(timer);
  }, [isCountingUp]);

  return (
    <>
      <SVGCtn name="Polyline">
        <svg width="400" height="400">
          <polyline
            points={stairs(400, count)}
            fill="none"
            stroke={`hsl(${(count * 360) / 10}, 60%, 50%)`}
            strokeWidth={2 + count}
          />
          <polyline
            points={stairs(400, count, false)}
            fill="none"
            stroke={`hsl(${(count * 360) / 10}, 60%, 50%)`}
            strokeWidth={2 + count}
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Path">
        <svg width="400" height="400">
          <path
            d="
            M0 0 
            L200 200 M200 0 
            L200 200 
            C150 100, 250 100, 300 10"
            fill="none"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d="
            M10 390 Q 195,-350 390,390"
            fill="none"
            stroke="orange"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d="
            M10 390 T 115,260 390,390"
            fill="none"
            stroke="green"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Path C">
        <svg width="400" height="400">
          <path
            d={`M10 200 C 100,${count * 40} 300,${
              400 - count * 40
            } 390,200 M10 200 C 200,0 200,0 390,200`}
            fill="none"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </svg>
      </SVGCtn>
      <SVGCtn name="Path A">
        <svg width="400" height="400">
          <path
            d="
          M 5 200 A 100,50 0 0 1 395,200"
            fill="none"
            stroke="pink"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="
          M 5 200 A 10,5 0 0 0 395,200"
            fill="none"
            stroke="purple"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="
          M 5 200 A 10,5 -20 1 0 395,200"
            fill="none"
            stroke="blue"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="
          M 5 200 A 10,5 20 0 0 395,200"
            fill="none"
            stroke="red"
            strokeWidth={10}
            strokeLinecap="round"
          />
        </svg>
      </SVGCtn>
    </>
  );
};

export default Path;
