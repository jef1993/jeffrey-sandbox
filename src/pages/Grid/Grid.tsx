import React from "react";
import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import Section from "../../components/Section/Section";
import ExpandBox from "./ExpandBox";
import AutoHeight from "./AutoHeight";

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
      <Section title="Auto Height">
        <AutoHeight />
      </Section>
    </motion.div>
  );
};

export default Grid;
