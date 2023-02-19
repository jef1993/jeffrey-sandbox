import React, { useState } from "react";
import Section from "../components/Section/Section";
import { motion, AnimatePresence } from "framer-motion";

const SwitchBoxes: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "violet"];

  const changeColorHandler = () => {
    setColorIndex((prev) => (colors.length - 1 <= prev ? 0 : colorIndex + 1));
  };
  return (
    <Section title="Switch Color Boxes">
      <>
        <div className="home-boxes">
          <AnimatePresence mode="popLayout">
            <motion.div
              className="home-boxes__box"
              style={{ backgroundColor: colors[colorIndex] }}
              key={colorIndex}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-110%", opacity: 0 }}
            />
          </AnimatePresence>
        </div>
        <button onClick={changeColorHandler}>Change Color</button>
      </>
    </Section>
  );
};

export default SwitchBoxes;
