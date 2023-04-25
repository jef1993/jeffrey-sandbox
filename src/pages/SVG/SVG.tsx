import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";

import Basic from "./Basic";
import Path from "./Path";
import Text from "./Text";
import Viewbox from "./Viewbox";
import Transform from "./Transform";
import Use from "./Use";

interface SVGCtnProps {
  children?: React.ReactNode;
  name?: string;
}

export const SVGCtn: React.FC<SVGCtnProps> = ({ children, name = "" }) => {
  return (
    <div className="svg__ctn">
      <div className="svg__ctn__box">{children}</div>
      <h2 className="svg__ctn__name">{name}</h2>
    </div>
  );
};

const SVG: React.FC = () => {
  return (
    <motion.div
      className="main__content svg"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Basic />
      <Path />
      <Text />
      <Viewbox />

      <Use />
      <Transform />
    </motion.div>
  );
};

export default SVG;
