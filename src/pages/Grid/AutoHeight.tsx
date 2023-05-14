import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoremIpsum } from "lorem-ipsum";
import { useResizeDetector } from "react-resize-detector";

const shortText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do";
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const AutoHeight: React.FC = () => {
  const [text, setText] = useState("generate some text...");
  const [words, setWords] = useState(100);
  const [isExpanded, setExpanded] = useState(false);
  const lorem = new LoremIpsum();
  const { width, height, ref } = useResizeDetector();

  const expandHandler = () => {
    setExpanded((prev) => !prev);
  };

  const generateHandler = () => {
    setText(words ? lorem.generateWords(words) : "");
  };

  const wordsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWords(+e.target.value);
  };

  return (
    <>
      <div className="auto-height">
        <div className="auto-height__options">
          <div className="auto-height__range">
            <span>{words}</span>
            <input
              type="range"
              value={words}
              onChange={wordsHandler}
              min={0}
              max={500}
              step={5}
            />
          </div>

          <button className="auto-height__btn" onClick={generateHandler}>
            Generate
          </button>
        </div>
        <div className="auto-height__ctn">
          <div className="auto-height__row">
            Some Text
            <button onClick={expandHandler}>
              {isExpanded ? "Close" : "Expand"}
            </button>
          </div>
          <motion.div
            transition={{ type: "tween", duration: 0.5 }}
            animate={{
              height: isExpanded ? height : 0,
              paddingTop: isExpanded ? "1.2rem" : "0rem",
            }}
            className="auto-height__content"
          >
            <p className="auto-height__text" ref={ref}>
              {text}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AutoHeight;
