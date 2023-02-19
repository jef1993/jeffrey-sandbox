import React from "react";
import { motion } from "framer-motion";

interface Prop {
  isOpened: boolean;
  onClick: () => void;
}

const MenuBtn: React.FC<Prop> = ({ isOpened, onClick }) => {
  const menuClose = {
    scale: 1,
    rotate: 0,
    borderRadius: "20%",
  };

  const menuOpen = {
    scale: 1.4,
    rotate: 180,
    borderRadius: "50%",
  };

  const spring = {
    type: "spring",
    stiffness: 800,
    damping: 30,
  };

  return (
    <motion.button
      className="menu-btn"
      whileHover={menuOpen}
      whileTap={{ scale: 1.15 }}
      style={isOpened ? menuOpen : menuClose}
      onClick={onClick}
    >
      <motion.div
        className="menu-btn__line"
        data-opened={isOpened}
        transition={spring}
      ></motion.div>
    </motion.button>
  );
};

export default MenuBtn;
