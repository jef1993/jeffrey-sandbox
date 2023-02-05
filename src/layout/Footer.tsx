/// <reference types="vite-plugin-svgr/client" />
import { Link } from "react-router-dom";
import { ReactComponent as LinkedInIcon } from "../assets/icons/linkedin.svg";
import { ReactComponent as GithubIcon } from "../assets/icons/github.svg";

const Footer = () => {
  return (
    <footer className="footer">
      Created by Jeffrey Leung{" "}
      <span>&copy;copyright {new Date().getFullYear()}</span>
      <nav className="footer__links">
        <Link className="footer__link" to="https://github.com/jef1993">
          <GithubIcon />
        </Link>
        <Link
          className="footer__link"
          to="https://www.linkedin.com/in/jef1993/"
        >
          <LinkedInIcon />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
