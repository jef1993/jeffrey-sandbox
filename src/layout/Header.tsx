import { Link, useLocation } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import MenuBtn from "../components/buttons/MenuBtn/MenuBtn";

interface HeaderProps {
  theme: string;
  setTheme: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  isMenuOpen,
  setIsMenuOpen,
}) => {
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

  const spring = {
    type: "spring",
    stiffness: 800,
    damping: 25,
  };

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <motion.div className="header__home" whileHover="hover" animate="rest">
          <motion.div variants={homeAnimate} transition={homeTransition}>
            Code Sandbox
          </motion.div>
          <motion.div variants={homeAnimate} transition={homeTransition}>
            Code Sandbox
          </motion.div>
        </motion.div>
      </Link>
      <div className="header__divider"></div>
      <div className="header__content">
        <h1 className="header__name">{mainPath}</h1>
        <div className="header__light-mode">
          {theme}
          <button
            className="header__light-mode__btn"
            type="button"
            onClick={setTheme}
            data-theme={theme}
          >
            <motion.div
              className="header__light-mode__thumb"
              layout="position"
              transition={spring}
            ></motion.div>
          </button>
        </div>
      </div>
      <MenuBtn isOpened={isMenuOpen} onClick={setIsMenuOpen} />
    </header>
  );
};

export default Header;
