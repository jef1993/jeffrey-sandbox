import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  theme: string;
  setTheme: () => void;
}

const Header = (props: HeaderProps) => {
  const { pathname } = useLocation();
  const mainPath = pathname.split("/")[1] || "basic";

  const thumbAnimate = {
    x: props.theme === "dark" ? 21 : 2,
  };

  return (
    <header className="header">
      <Link to="/" className="header__home">
        Framer Motion
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

      <button className="header__menu">
        <div className="header__menu__line"></div>
      </button>
    </header>
  );
};

export default Header;
