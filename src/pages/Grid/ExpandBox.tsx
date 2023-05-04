import React, { useState, CSSProperties } from "react";

interface ExpandBoxProps {
  className?: string;
  cols?: number;
  rows?: number;
}

const ExpandBox: React.FC<ExpandBoxProps> = ({
  className = "",
  rows = 3,
  cols = 3,
}) => {
  const [clickedBox, setClickedBox] = useState<number | null>(null);
  const boxCount = cols * rows;

  const generateArr = (length: number) => {
    return Array(length)
      .fill("")
      .map((_, i) => i + 1);
  };

  const gridStyles: () => CSSProperties = () => {
    if (!clickedBox)
      return {
        gridTemplateColumns: Array(cols).fill("1fr").join(" "),
        gridTemplateRows: Array(rows).fill("1fr").join(" "),
      };
    const rowIndex = Math.floor((clickedBox - 1) / cols);
    const colIndex = (clickedBox - 1) % cols;

    const getGridTemplateValue = (count: number, index: number) => {
      return Array(count)
        .fill("")
        .map((_, i) => (i === index ? "1fr" : "0fr"))
        .join(" ");
    };
    const colValue = getGridTemplateValue(cols, colIndex);
    const rowValue = getGridTemplateValue(rows, rowIndex);
    return { gridTemplateColumns: colValue, gridTemplateRows: rowValue };
  };

  const clickHandler = (n: number) => {
    setClickedBox((prev) => (prev === null ? n : null));
  };

  return (
    <div
      className={`expand-box${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: `${cols}/${rows}`, ...gridStyles() }}
    >
      {generateArr(boxCount).map((n) => (
        <div
          className="expand-box__box-wrapper"
          key={n}
          onClick={clickHandler.bind(null, n)}
        >
          <div
            className="expand-box__box"
            style={{
              backgroundColor: `hsl(${((n - 1) * 360) / boxCount}, 75%, 55%)`,
            }}
            aria-expanded={clickedBox === n}
          >
            <span aria-hidden={!clickedBox ? false : clickedBox !== n}>
              {n}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ExpandBox;
