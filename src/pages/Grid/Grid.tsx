import React from "react";
import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import Section from "../../components/Section/Section";
import ExpandBox from "./ExpandBox";

const Grid: React.FC = () => {
  return (
    <motion.div
      className="main__content grid"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Section title="Expand On Click">
        <ExpandBox cols={8} rows={3} />
      </Section>
    </motion.div>
  );
};

export default Grid;
