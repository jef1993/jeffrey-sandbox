import React, { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { pageAnimate } from "../fmConfig";
import { useLocation } from "react-router-dom";
import Keyframes from "../../sections/Keyframes";
import SwitchBoxes from "../../sections/SwitchBoxes";
import BounceBall from "../../sections/BounceBall";

const Home: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      className="main__content home"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Keyframes />
      <SwitchBoxes />
      <BounceBall />
    </motion.div>
  );
};

export default Home;
