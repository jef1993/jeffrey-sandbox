import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  theme: string;
  setTheme: () => void;
}

const Header = (props: HeaderProps) => {
  const { pathname } = useLocation();
  const mainPath = pathname.split("/")[1] || "basic";

  const homeTransition = {
    type: "spring",
    stiffness: 10,
    y: { duration: 0.3 },
  };

  const homeAnimate = {
    rest: {
      y: 0,
      scale: [1, 0.85, 1],
    },
    hover: {
      y: "-100%",
      scale: [1, 0.85, 1],
    },
  };

  const thumbAnimate = {
    x: props.theme === "dark" ? 21 : 2,
  };

  const menuHoverAnimate = {
    height: [30, 42],
    width: [30, 42],
    rotate: [0, 180],
    borderRadius: ["20%", "50%"],
  };

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <motion.div className="header__home" whileHover="hover" animate="rest">
          <motion.div variants={homeAnimate} transition={homeTransition}>
            Framer Motion
          </motion.div>
          <motion.div variants={homeAnimate} transition={homeTransition}>
            Framer Motion
          </motion.div>
        </motion.div>
      </Link>
      <div className="header__divider"></div>
      <div className="header__content">
        <h1 className="header__name">{mainPath}</h1>
        <div className="header__light-mode">
          {props.theme}
          <button
            className="header__light-mode__btn"
            type="button"
            onClick={props.setTheme}
          >
            <motion.div
              className="header__light-mode__thumb"
              animate={thumbAnimate}
            ></motion.div>
          </button>
        </div>
      </div>

      <motion.button
        className="header__menu"
        whileHover={menuHoverAnimate}
        whileTap={{ scale: 0.9 }}
      >
        <div className="header__menu__line"></div>
      </motion.button>
    </header>
  );
};

export default Header;
