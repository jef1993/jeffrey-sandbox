import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import Basic from "./sections/Basic";

const YupHookForm: React.FC = () => {
  return (
    <motion.div
      className="main__content yhf"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Basic />
    </motion.div>
  );
};

export default YupHookForm;
