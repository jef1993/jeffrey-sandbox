import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (boolean: boolean) => void;
}

const Menu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const pageNames = [
    "basics",
    "Inputs",
    "fetch",
    "notiflix",
    "scrollbar",
    "react query",
    "in view",
    "parallax",
    "SVG",
    "grid",
  ];

  const menuStyle = {
    open: {
      x: 0,
    },
    closed: {
      x: "125%",
    },
  };

  const menuTransition = {
    type: "spring",
    stiffness: 500,
    damping: 20,
  };

  return (
    <motion.nav
      className="menu"
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={menuStyle}
      transition={menuTransition}
    >
      <h2 className="menu__title">Menu</h2>
      <ul className="menu__list">
        {pageNames.map((name, i) => (
          <li key={name} className="menu__item">
            <Link
              className="menu__link"
              to={`/${i === 0 ? "" : name.replace(" ", "-").toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Menu;
